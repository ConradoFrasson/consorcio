import { type User, type InsertUser, type ConsortiumCard, type InsertConsortiumCard, type UpdateConsortiumCard, users, consortiumCards } from "../shared/schema";
import { IStorage } from "./storage.interface";
import { db } from "./drizzle";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";
import * as bcrypt from "bcryptjs";

export class DrizzleStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const hashedPassword = bcrypt.hashSync(insertUser.password, 8);
    const user = { username: insertUser.username, password: hashedPassword, id };
    const result = await db.insert(users).values(user).returning();
    return result[0];
  }

  async getAllCards(): Promise<ConsortiumCard[]> {
    return db.select().from(consortiumCards);
  }

  async getActiveCards(): Promise<ConsortiumCard[]> {
    return db.select().from(consortiumCards).where(eq(consortiumCards.ativo, true));
  }

  async getCardById(id: string): Promise<ConsortiumCard | undefined> {
    const result = await db.select().from(consortiumCards).where(eq(consortiumCards.id, id));
    return result[0];
  }

  async createCard(insertCard: InsertConsortiumCard): Promise<ConsortiumCard> {
    const id = randomUUID();
    const card = { ...insertCard, id, ativo: insertCard.ativo ?? true };
    const result = await db.insert(consortiumCards).values(card).returning();
    return result[0];
  }

  async updateCard(id: string, updates: UpdateConsortiumCard): Promise<ConsortiumCard | undefined> {
    const result = await db.update(consortiumCards).set(updates).where(eq(consortiumCards.id, id)).returning();
    return result[0];
  }

  async deleteCard(id: string): Promise<boolean> {
    const result = await db.delete(consortiumCards).where(eq(consortiumCards.id, id)).returning();
    return result.length > 0;
  }
}

export const storage = new DrizzleStorage();
