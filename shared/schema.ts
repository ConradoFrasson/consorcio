import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
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
  credito: text("credito").notNull(), // Valor do bem
  parcelas: text("parcelas").notNull(),
  prazo: text("prazo").notNull(),
  entrada: text("entrada").notNull(),
  tipo: text("tipo").notNull(), // "contemplado" or "nao-contemplado"
  telefone: text("telefone").notNull(),
  valorCarta: text("valor_carta").notNull(),
  taxaAdministradora: text("taxa_administradora").notNull(),
  fundoReserva: text("fundo_reserva").notNull(),
  saldoDevedor: text("saldo_devedor").notNull(),
  lance: text("lance").notNull(),
  ativo: integer("ativo", { mode: "boolean" }).notNull().default(true),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertConsortiumCardSchema = createInsertSchema(consortiumCards).omit({
  id: true,
});

export const updateConsortiumCardSchema = insertConsortiumCardSchema.partial();

export type InsertUser = {
  username: string;
  password: string;
}
export type User = {
  id: string;
  username:string;
  password: string;
};
export type ConsortiumCard = {
  id: string;
  administradora: string;
  credito: string;
  parcelas: string;
  prazo: string;
  entrada: string;
  tipo: string;
  telefone: string;
  valorCarta: string;
  taxaAdministradora: string;
  fundoReserva: string;
  saldoDevedor: string;
  lance: string;
  ativo: boolean;
};
export type InsertConsortiumCard = Omit<ConsortiumCard, 'id' | 'ativo'> & { ativo?: boolean };
export type UpdateConsortiumCard = Partial<InsertConsortiumCard>;
