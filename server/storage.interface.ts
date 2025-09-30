import { type User, type InsertUser, type ConsortiumCard, type InsertConsortiumCard, type UpdateConsortiumCard } from "../shared/schema.js";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Consortium Cards methods
  getAllCards(): Promise<ConsortiumCard[]>;
  getActiveCards(): Promise<ConsortiumCard[]>;
  getCardById(id: string): Promise<ConsortiumCard | undefined>;
  createCard(card: InsertConsortiumCard): Promise<ConsortiumCard>;
  updateCard(id: string, updates: UpdateConsortiumCard): Promise<ConsortiumCard | undefined>;
  deleteCard(id: string): Promise<boolean>;
}
