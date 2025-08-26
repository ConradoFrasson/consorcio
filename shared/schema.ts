import { sql } from "drizzle-orm";
import { pgTable, text, varchar, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const consortiumCards = pgTable("consortium_cards", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
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
  ativo: boolean("ativo").notNull().default(true),
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

