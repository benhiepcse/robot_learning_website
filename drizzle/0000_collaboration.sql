CREATE TABLE `collaboration_channels` (
  `id` text PRIMARY KEY NOT NULL,
  `name` text NOT NULL,
  `description` text DEFAULT '' NOT NULL,
  `created_by` text NOT NULL,
  `created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `collaboration_messages` (
  `id` text PRIMARY KEY NOT NULL,
  `channel_id` text NOT NULL,
  `author` text NOT NULL,
  `body` text DEFAULT '' NOT NULL,
  `reply_to` text,
  `project_id` text,
  `pinned` integer DEFAULT false NOT NULL,
  `created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `collaboration_files` (
  `id` text PRIMARY KEY NOT NULL,
  `message_id` text NOT NULL,
  `channel_id` text NOT NULL,
  `uploaded_by` text NOT NULL,
  `name` text NOT NULL,
  `content_type` text NOT NULL,
  `size` integer NOT NULL,
  `object_key` text NOT NULL,
  `created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `collaboration_reactions` (
  `message_id` text NOT NULL,
  `username` text NOT NULL,
  `emoji` text NOT NULL,
  `created_at` integer NOT NULL,
  PRIMARY KEY (`message_id`, `username`, `emoji`)
);
--> statement-breakpoint
CREATE TABLE `collaboration_presence` (
  `username` text PRIMARY KEY NOT NULL,
  `channel_id` text,
  `last_seen_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `collaboration_messages_channel_idx` ON `collaboration_messages` (`channel_id`,`created_at`);
--> statement-breakpoint
CREATE INDEX `collaboration_files_channel_idx` ON `collaboration_files` (`channel_id`,`created_at`);
