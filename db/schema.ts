import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const collaborationChannels = sqliteTable("collaboration_channels", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull().default(""),
  createdBy: text("created_by").notNull(),
  createdAt: integer("created_at").notNull(),
});

export const collaborationMessages = sqliteTable("collaboration_messages", {
  id: text("id").primaryKey(),
  channelId: text("channel_id").notNull(),
  author: text("author").notNull(),
  body: text("body").notNull().default(""),
  replyTo: text("reply_to"),
  projectId: text("project_id"),
  pinned: integer("pinned", { mode: "boolean" }).notNull().default(false),
  createdAt: integer("created_at").notNull(),
});

export const collaborationFiles = sqliteTable("collaboration_files", {
  id: text("id").primaryKey(),
  messageId: text("message_id").notNull(),
  channelId: text("channel_id").notNull(),
  uploadedBy: text("uploaded_by").notNull(),
  name: text("name").notNull(),
  contentType: text("content_type").notNull(),
  size: integer("size").notNull(),
  objectKey: text("object_key").notNull(),
  createdAt: integer("created_at").notNull(),
});

export const collaborationReactions = sqliteTable("collaboration_reactions", {
  messageId: text("message_id").notNull(),
  username: text("username").notNull(),
  emoji: text("emoji").notNull(),
  createdAt: integer("created_at").notNull(),
});

export const collaborationPresence = sqliteTable("collaboration_presence", {
  username: text("username").primaryKey(),
  channelId: text("channel_id"),
  lastSeenAt: integer("last_seen_at").notNull(),
});
