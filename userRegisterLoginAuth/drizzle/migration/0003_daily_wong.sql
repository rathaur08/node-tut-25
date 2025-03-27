CREATE TABLE `sessions_table` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`valid` boolean NOT NULL DEFAULT true,
	`user_agent` text,
	`ip` varchar(250),
	`created_at` timestamp NOT NULL DEFAULT now(),
	`updated_at` timestamp NOT NULL DEFAULT now(),
	CONSTRAINT `sessions_table_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `sessions_table` ADD CONSTRAINT `sessions_table_user_id_users_table_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users_table`(`id`) ON DELETE cascade ON UPDATE no action;