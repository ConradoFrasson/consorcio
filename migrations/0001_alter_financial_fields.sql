-- Alter consortium_cards table to use proper data types for financial fields
-- Note: SQLite doesn't support direct column type changes, so we'll need to recreate the table

-- Create a new table with correct types
CREATE TABLE `consortium_cards_new` (
	`id` text PRIMARY KEY NOT NULL,
	`administradora` text NOT NULL,
	`credito` real NOT NULL,
	`parcelas` integer NOT NULL,
	`prazo` integer NOT NULL,
	`entrada` real NOT NULL,
	`tipo` text NOT NULL,
	`telefone` text NOT NULL,
	`valor_carta` real NOT NULL,
	`taxa_administradora` real NOT NULL,
	`fundo_reserva` real NOT NULL,
	`saldo_devedor` real NOT NULL,
	`lance` real NOT NULL,
	`ativo` integer DEFAULT true NOT NULL
);

-- Copy data from old table to new table (with type conversion)
INSERT INTO `consortium_cards_new` (id, administradora, credito, parcelas, prazo, entrada, tipo, telefone, valor_carta, taxa_administradora, fundo_reserva, saldo_devedor, lance, ativo)
SELECT
  id,
  administradora,
  CAST(credito AS real),
  CAST(parcelas AS integer),
  CAST(prazo AS integer),
  CAST(entrada AS real),
  tipo,
  telefone,
  CAST(valor_carta AS real),
  CAST(taxa_administradora AS real),
  CAST(fundo_reserva AS real),
  CAST(saldo_devedor AS real),
  CAST(lance AS real),
  ativo
FROM `consortium_cards`;

-- Drop old table and rename new table
DROP TABLE `consortium_cards`;
ALTER TABLE `consortium_cards_new` RENAME TO `consortium_cards`;