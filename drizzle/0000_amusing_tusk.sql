CREATE TABLE `leads` (
	`id` text PRIMARY KEY NOT NULL,
	`payload` text NOT NULL,
	`fingerprint` text NOT NULL,
	`classification` text NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `rate_limits` (
	`key` text PRIMARY KEY NOT NULL,
	`count` integer NOT NULL,
	`expires_at` integer NOT NULL
);
