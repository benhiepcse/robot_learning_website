import { NextResponse } from "next/server";
import { collaborationEnv, ensureCollaborationSchema } from "../../../lib/collaboration-db";
import { requireRoboLearnUser } from "../../../lib/robolearn-auth";

const displayNames: Record<string, string> = {
  levonghiahiep: "Ben Hiệp",
  phanthethong: "Thế Thông",
};

function unauthorized() {
  return NextResponse.json({ ok: false, message: "Phiên đăng nhập không hợp lệ." }, { status: 401 });
}

async function snapshot(username: string, selectedChannel?: string | null) {
  await ensureCollaborationSchema();
  const { DB } = collaborationEnv();
  const now = Date.now();
  await DB.prepare("INSERT INTO collaboration_presence (username, channel_id, last_seen_at) VALUES (?, ?, ?) ON CONFLICT(username) DO UPDATE SET channel_id = excluded.channel_id, last_seen_at = excluded.last_seen_at")
    .bind(username, selectedChannel ?? null, now).run();

  const [channelsResult, messagesResult, filesResult, reactionsResult, presenceResult] = await Promise.all([
    DB.prepare("SELECT id, name, description, created_by AS createdBy, created_at AS createdAt FROM collaboration_channels ORDER BY created_at ASC").all(),
    DB.prepare("SELECT id, channel_id AS channel, author, body AS text, reply_to AS replyTo, project_id AS projectId, pinned, created_at AS createdAt FROM collaboration_messages ORDER BY created_at ASC LIMIT 1000").all(),
    DB.prepare("SELECT id, message_id AS messageId, channel_id AS channel, uploaded_by AS uploadedBy, name, content_type AS type, size, created_at AS createdAt FROM collaboration_files ORDER BY created_at DESC LIMIT 500").all(),
    DB.prepare("SELECT message_id AS messageId, username, emoji FROM collaboration_reactions").all(),
    DB.prepare("SELECT username, channel_id AS channel, last_seen_at AS lastSeenAt FROM collaboration_presence").all(),
  ]);

  const filesByMessage = new Map<string, unknown[]>();
  for (const file of filesResult.results as Array<Record<string, unknown>>) {
    const messageId = String(file.messageId);
    const items = filesByMessage.get(messageId) ?? [];
    items.push({ ...file, url: `/api/collaboration/files/${file.id}` });
    filesByMessage.set(messageId, items);
  }
  const reactionsByMessage = new Map<string, Record<string, string[]>>();
  for (const reaction of reactionsResult.results as Array<Record<string, unknown>>) {
    const messageId = String(reaction.messageId);
    const current = reactionsByMessage.get(messageId) ?? {};
    const emoji = String(reaction.emoji);
    current[emoji] = [...(current[emoji] ?? []), String(reaction.username)];
    reactionsByMessage.set(messageId, current);
  }
  const messages = (messagesResult.results as Array<Record<string, unknown>>).map((message) => ({
    ...message,
    pinned: Boolean(message.pinned),
    attachments: filesByMessage.get(String(message.id)) ?? [],
    reactions: reactionsByMessage.get(String(message.id)) ?? {},
  }));
  const members = ["levonghiahiep", "phanthethong"].map((memberUsername) => {
    const presence = (presenceResult.results as Array<Record<string, unknown>>).find((item) => item.username === memberUsername);
    const lastSeenAt = Number(presence?.lastSeenAt ?? 0);
    return {
      username: memberUsername,
      name: displayNames[memberUsername],
      online: now - lastSeenAt < 20_000,
      lastSeenAt,
      channel: presence?.channel ?? null,
    };
  });
  return { channels: channelsResult.results, messages, files: filesResult.results, members, serverTime: now };
}

export async function GET(request: Request) {
  const username = await requireRoboLearnUser(request);
  if (!username) return unauthorized();
  const url = new URL(request.url);
  return NextResponse.json({ ok: true, ...(await snapshot(username, url.searchParams.get("channel"))) });
}

export async function POST(request: Request) {
  const username = await requireRoboLearnUser(request);
  if (!username) return unauthorized();
  await ensureCollaborationSchema();
  const { DB, FILES } = collaborationEnv();
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("multipart/form-data")) {
    const form = await request.formData();
    const channelId = String(form.get("channelId") ?? "");
    const text = String(form.get("text") ?? "");
    const replyTo = String(form.get("replyTo") ?? "") || null;
    const projectId = String(form.get("projectId") ?? "") || null;
    const messageId = crypto.randomUUID();
    const createdAt = Date.now();
    const files = form.getAll("files").filter((value): value is File => value instanceof File).slice(0, 5);
    if (!channelId || (!text.trim() && !files.length)) return NextResponse.json({ ok: false, message: "Tin nhắn trống." }, { status: 400 });
    await DB.prepare("INSERT INTO collaboration_messages (id, channel_id, author, body, reply_to, project_id, pinned, created_at) VALUES (?, ?, ?, ?, ?, ?, 0, ?)")
      .bind(messageId, channelId, username, text.trim(), replyTo, projectId, createdAt).run();
    for (const file of files) {
      if (file.size > 25 * 1024 * 1024) continue;
      const fileId = crypto.randomUUID();
      const key = `collaboration/${channelId}/${fileId}`;
      await FILES.put(key, file.stream(), { httpMetadata: { contentType: file.type || "application/octet-stream", contentDisposition: `attachment; filename="${encodeURIComponent(file.name)}"` } });
      await DB.prepare("INSERT INTO collaboration_files (id, message_id, channel_id, uploaded_by, name, content_type, size, object_key, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)")
        .bind(fileId, messageId, channelId, username, file.name, file.type || "application/octet-stream", file.size, key, createdAt).run();
    }
    return NextResponse.json({ ok: true, ...(await snapshot(username, channelId)) });
  }

  const body = await request.json() as Record<string, unknown>;
  const action = String(body.action ?? "");
  if (action === "createChannel") {
    const name = String(body.name ?? "").trim().slice(0, 40);
    const description = String(body.description ?? "").trim().slice(0, 160);
    if (!name) return NextResponse.json({ ok: false, message: "Tên kênh là bắt buộc." }, { status: 400 });
    const id = `${name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}-${crypto.randomUUID().slice(0, 5)}`;
    await DB.prepare("INSERT INTO collaboration_channels (id, name, description, created_by, created_at) VALUES (?, ?, ?, ?, ?)").bind(id, name, description, username, Date.now()).run();
    return NextResponse.json({ ok: true, channelId: id, ...(await snapshot(username, id)) });
  }
  if (action === "deleteChannel") {
    const channelId = String(body.channelId ?? "");
    const protectedIds = ["general", "ai-perception", "control-simulation", "project-discussion", "ideas", "dm-team"];
    if (protectedIds.includes(channelId)) return NextResponse.json({ ok: false, message: "Kênh mặc định không thể xóa." }, { status: 400 });
    const owned = await DB.prepare("SELECT created_by AS createdBy FROM collaboration_channels WHERE id = ?").bind(channelId).first<{ createdBy: string }>();
    if (!owned || (owned.createdBy !== username && username !== "levonghiahiep")) return NextResponse.json({ ok: false, message: "Bạn không có quyền xóa kênh này." }, { status: 403 });
    const storedFiles = await DB.prepare("SELECT object_key AS objectKey FROM collaboration_files WHERE channel_id = ?").bind(channelId).all<{ objectKey: string }>();
    for (const file of storedFiles.results) await FILES.delete(file.objectKey);
    await DB.batch([
      DB.prepare("DELETE FROM collaboration_reactions WHERE message_id IN (SELECT id FROM collaboration_messages WHERE channel_id = ?)").bind(channelId),
      DB.prepare("DELETE FROM collaboration_files WHERE channel_id = ?").bind(channelId),
      DB.prepare("DELETE FROM collaboration_messages WHERE channel_id = ?").bind(channelId),
      DB.prepare("DELETE FROM collaboration_channels WHERE id = ?").bind(channelId),
    ]);
    return NextResponse.json({ ok: true, ...(await snapshot(username, "general")) });
  }
  if (action === "togglePin") {
    await DB.prepare("UPDATE collaboration_messages SET pinned = CASE pinned WHEN 1 THEN 0 ELSE 1 END WHERE id = ?").bind(String(body.messageId ?? "")).run();
  } else if (action === "react") {
    const messageId = String(body.messageId ?? "");
    const emoji = String(body.emoji ?? "").slice(0, 16);
    const existing = await DB.prepare("SELECT 1 FROM collaboration_reactions WHERE message_id = ? AND username = ? AND emoji = ?").bind(messageId, username, emoji).first();
    if (existing) await DB.prepare("DELETE FROM collaboration_reactions WHERE message_id = ? AND username = ? AND emoji = ?").bind(messageId, username, emoji).run();
    else await DB.prepare("INSERT INTO collaboration_reactions (message_id, username, emoji, created_at) VALUES (?, ?, ?, ?)").bind(messageId, username, emoji, Date.now()).run();
  } else if (action === "deleteMessage") {
    const messageId = String(body.messageId ?? "");
    const message = await DB.prepare("SELECT author FROM collaboration_messages WHERE id = ?").bind(messageId).first<{ author: string }>();
    if (!message || (message.author !== username && username !== "levonghiahiep")) return NextResponse.json({ ok: false, message: "Bạn không có quyền xóa tin nhắn này." }, { status: 403 });
    const storedFiles = await DB.prepare("SELECT object_key AS objectKey FROM collaboration_files WHERE message_id = ?").bind(messageId).all<{ objectKey: string }>();
    for (const file of storedFiles.results) await FILES.delete(file.objectKey);
    await DB.batch([
      DB.prepare("DELETE FROM collaboration_reactions WHERE message_id = ?").bind(messageId),
      DB.prepare("DELETE FROM collaboration_files WHERE message_id = ?").bind(messageId),
      DB.prepare("DELETE FROM collaboration_messages WHERE id = ?").bind(messageId),
    ]);
  }
  return NextResponse.json({ ok: true, ...(await snapshot(username, String(body.channelId ?? "") || null)) });
}
