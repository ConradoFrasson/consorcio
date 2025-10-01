CREATE TABLE `consortium_cards` (
	`id` text PRIMARY KEY NOT NULL,
	`administradora` text NOT NULL,
	`credito` text NOT NULL,
	`parcelas` text NOT NULL,
	`prazo` text NOT NULL,
	`entrada` text NOT NULL,
	`tipo` text NOT NULL,
	`telefone` text NOT NULL,
	`valor_carta` text NOT NULL,
	`taxa_administradora` text NOT NULL,
	`fundo_reserva` text NOT NULL,
	`saldo_devedor` text NOT NULL,
	`lance` text NOT NULL,
	`ativo` integer DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`password` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);