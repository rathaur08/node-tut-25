CREATE TABLE `product_table` (
	`id` int AUTO_INCREMENT NOT NULL,
	`produc_name` varchar(255) NOT NULL,
	`produc_value` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT now(),
	`updated_at` timestamp NOT NULL DEFAULT now(),
	`user_id` int NOT NULL,
	CONSTRAINT `product_table_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `product_table` ADD CONSTRAINT `product_table_user_id_users_table_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users_table`(`id`) ON DELETE no action ON UPDATE no action;