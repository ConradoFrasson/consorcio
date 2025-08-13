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

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type ConsortiumCard = typeof consortiumCards.$inferSelect;
export type InsertConsortiumCard = z.infer<typeof insertConsortiumCardSchema>;
export type UpdateConsortiumCard = z.infer<typeof updateConsortiumCardSchema>;

