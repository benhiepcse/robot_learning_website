import { NextResponse } from "next/server";
import { collaborationEnv, ensureCollaborationSchema } from "../../../../../lib/collaboration-db";
import { requireRoboLearnUser } from "../../../../../lib/robolearn-auth";

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const username = await requireRoboLearnUser(request);
  if (!username) return NextResponse.json({ ok: false }, { status: 401 });
  await ensureCollaborationSchema();
  const { id } = await context.params;
  const { DB, FILES } = collaborationEnv();
  const record = await DB.prepare("SELECT name, content_type AS contentType, object_key AS objectKey FROM collaboration_files WHERE id = ?").bind(id).first<{ name: string; contentType: string; objectKey: string }>();
  if (!record) return NextResponse.json({ ok: false }, { status: 404 });
  const object = await FILES.get(record.objectKey);
  if (!object) return NextResponse.json({ ok: false }, { status: 404 });
  return new Response(object.body, {
    headers: {
      "content-type": record.contentType,
      "content-disposition": `attachment; filename*=UTF-8''${encodeURIComponent(record.name)}`,
      "cache-control": "private, max-age=60",
    },
  });
}
