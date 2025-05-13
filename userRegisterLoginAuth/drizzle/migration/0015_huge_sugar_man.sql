ALTER TABLE `product_table` ADD `created_at` timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE `product_table` ADD `updated_at` timestamp DEFAULT now() NOT NULL;