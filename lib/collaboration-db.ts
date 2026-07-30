import { env } from "cloudflare:workers";

type RuntimeEnv = { DB: D1Database; FILES: R2Bucket };

export function collaborationEnv() {
  return env as unknown as RuntimeEnv;
}

export async function ensureCollaborationSchema() {
  const { DB } = collaborationEnv();
  await DB.batch([
    DB.prepare("CREATE TABLE IF NOT EXISTS collaboration_channels (id TEXT PRIMARY KEY, name TEXT NOT NULL, description TEXT NOT NULL DEFAULT '', created_by TEXT NOT NULL, created_at INTEGER NOT NULL)"),
    DB.prepare("CREATE TABLE IF NOT EXISTS collaboration_messages (id TEXT PRIMARY KEY, channel_id TEXT NOT NULL, author TEXT NOT NULL, body TEXT NOT NULL DEFAULT '', reply_to TEXT, project_id TEXT, pinned INTEGER NOT NULL DEFAULT 0, created_at INTEGER NOT NULL)"),
    DB.prepare("CREATE TABLE IF NOT EXISTS collaboration_files (id TEXT PRIMARY KEY, message_id TEXT NOT NULL, channel_id TEXT NOT NULL, uploaded_by TEXT NOT NULL, name TEXT NOT NULL, content_type TEXT NOT NULL, size INTEGER NOT NULL, object_key TEXT NOT NULL, created_at INTEGER NOT NULL)"),
    DB.prepare("CREATE TABLE IF NOT EXISTS collaboration_reactions (message_id TEXT NOT NULL, username TEXT NOT NULL, emoji TEXT NOT NULL, created_at INTEGER NOT NULL, PRIMARY KEY(message_id, username, emoji))"),
    DB.prepare("CREATE TABLE IF NOT EXISTS collaboration_presence (username TEXT PRIMARY KEY, channel_id TEXT, last_seen_at INTEGER NOT NULL)"),
    DB.prepare("CREATE INDEX IF NOT EXISTS collaboration_messages_channel_idx ON collaboration_messages(channel_id, created_at)"),
    DB.prepare("CREATE INDEX IF NOT EXISTS collaboration_files_channel_idx ON collaboration_files(channel_id, created_at)"),
  ]);

  const defaults = [
    ["general", "General", "Thông báo và trao đổi chung"],
    ["ai-perception", "AI Perception", "Computer Vision, VLM, VLA và 3D Perception"],
    ["control-simulation", "Control & Simulation", "Control, ROS2, MuJoCo và Isaac Sim"],
    ["project-discussion", "Project Discussion", "Review tiến độ và phối hợp project"],
    ["ideas", "Ideas & Research", "Ý tưởng, paper và thử nghiệm mới"],
    ["dm-team", "Ben Hiệp & Thế Thông", "Tin nhắn trực tiếp riêng tư giữa hai thành viên"],
  ];
  await DB.batch(defaults.map(([id, name, description]) =>
    DB.prepare("INSERT OR IGNORE INTO collaboration_channels (id, name, description, created_by, created_at) VALUES (?, ?, ?, ?, ?)")
      .bind(id, name, description, "levonghiahiep", Date.now())
  ));
}
