CREATE TABLE `contact_table` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`number` varchar(20) NOT NULL,
	`email` varchar(255) NOT NULL,
	`message` varchar(500) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT now(),
	`updated_at` timestamp NOT NULL DEFAULT now(),
	CONSTRAINT `contact_table_id` PRIMARY KEY(`id`),
	CONSTRAINT `contact_table_number_unique` UNIQUE(`number`),
	CONSTRAINT `contact_table_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `product_table` DROP FOREIGN KEY `product_table_user_id_users_table_id_fk`;
--> statement-breakpoint
ALTER TABLE `product_table` ADD CONSTRAINT `product_table_user_id_users_table_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users_table`(`id`) ON DELETE cascade ON UPDATE no action;