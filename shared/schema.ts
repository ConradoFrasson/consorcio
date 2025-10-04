import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const consortiumCards = sqliteTable("consortium_cards", {
  id: text("id").primaryKey(),
  administradora: text("administradora").notNull(),
  credito: real("credito").notNull(), // Valor do bem
  parcelas: integer("parcelas").notNull(),
  prazo: integer("prazo").notNull(),
  entrada: real("entrada").notNull(),
  tipo: text("tipo").notNull(), // "contemplado" or "nao-contemplado"
  telefone: text("telefone").notNull(),
  valorCarta: real("valor_carta").notNull(),
  taxaAdministradora: real("taxa_administradora").notNull(),
  fundoReserva: real("fundo_reserva").notNull(),
  saldoDevedor: real("saldo_devedor").notNull(),
  lance: real("lance").notNull(),
  ativo: integer("ativo", { mode: "boolean" }).notNull().default(true),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertConsortiumCardSchema = createInsertSchema(consortiumCards).omit({
  id: true,
}).extend({
  credito: z.number().min(0, "Crédito deve ser maior que zero"),
  parcelas: z.number().int().min(1, "Número de parcelas deve ser pelo menos 1"),
  prazo: z.number().int().min(1, "Prazo deve ser pelo menos 1 mês"),
  entrada: z.number().min(0, "Entrada deve ser maior ou igual a zero"),
  valorCarta: z.number().min(0, "Valor da carta deve ser maior que zero"),
  taxaAdministradora: z.number().min(0, "Taxa administrativa deve ser maior ou igual a zero"),
  fundoReserva: z.number().min(0, "Fundo de reserva deve ser maior ou igual a zero"),
  saldoDevedor: z.number().min(0, "Saldo devedor deve ser maior ou igual a zero"),
  lance: z.number().min(0, "Lance deve ser maior ou igual a zero"),
});

export const updateConsortiumCardSchema = insertConsortiumCardSchema.partial();

export type InsertUser = {
  username: string;
  password: string;
}
export type User = {
  id: string;
  username: string;
  password: string;
};
export type ConsortiumCard = {
  id: string;
  administradora: string;
  credito: number;
  parcelas: number;
  prazo: number;
  entrada: number;
  tipo: string;
  telefone: string;
  valorCarta: number;
  taxaAdministradora: number;
  fundoReserva: number;
  saldoDevedor: number;
  lance: number;
  ativo: boolean;
};
export type InsertConsortiumCard = Omit<ConsortiumCard, 'id' | 'ativo'> & { ativo?: boolean };
export type UpdateConsortiumCard = Partial<InsertConsortiumCard>;
