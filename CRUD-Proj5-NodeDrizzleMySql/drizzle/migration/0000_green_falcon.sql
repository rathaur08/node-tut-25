CREATE TABLE `Contactss` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`phone` varchar(20) NOT NULL,
	`message` varchar(500) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT now(),
	`updated_at` timestamp NOT NULL DEFAULT now(),
	CONSTRAINT `Contactss_id` PRIMARY KEY(`id`)
);
