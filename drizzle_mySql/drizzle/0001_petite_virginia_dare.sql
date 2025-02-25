CREATE TABLE `emp_users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT now(),
	`updated_at` timestamp NOT NULL DEFAULT now(),
	CONSTRAINT `emp_users_id` PRIMARY KEY(`id`),
	CONSTRAINT `emp_users_email_unique` UNIQUE(`email`)
);
