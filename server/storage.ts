import { type User, type InsertUser, type ConsortiumCard, type InsertConsortiumCard, type UpdateConsortiumCard } from "../shared/schema";
import { randomUUID } from "crypto";

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

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private cards: Map<string, ConsortiumCard>;

  constructor() {
    this.users = new Map();
    this.cards = new Map();

    // Create default admin user
    const adminId = randomUUID();
    const adminUser: User = {
      id: adminId,
      username: "admin@consorciocards.com",
      password: "admin123", // In production, this should be hashed
    };
    this.users.set(adminId, adminUser);

    // Add sample consortium cards
    this.addSampleCards();
  }

  private addSampleCards() {
    const sampleCards: InsertConsortiumCard[] = [
      {
        administradora: "Contempla",
        credito: "R$ 180.000",
        parcelas: "36x de R$ 850",
        prazo: "36 meses",
        entrada: "R$ 45.000",
        tipo: "contemplado",
        telefone: "(11) 99999-1234",
        valorCarta: "R$ 142.000",
        taxaAdministradora: "19,5% a.a.",
        fundoReserva: "R$ 8.500",
        saldoDevedor: "R$ 32.450",
        lance: "R$ 15.000",
        ativo: true,
      },
      {
        administradora: "Rodobens",
        credito: "R$ 120.000",
        parcelas: "60x de R$ 380",
        prazo: "60 meses",
        entrada: "R$ 12.000",
        tipo: "nao-contemplado",
        telefone: "(11) 98888-5678",
        valorCarta: "R$ 98.000",
        taxaAdministradora: "21,0% a.a.",
        fundoReserva: "R$ 6.200",
        saldoDevedor: "R$ 45.800",
        lance: "R$ 8.000",
        ativo: true,
      },
      {
        administradora: "Caixa Consórcios",
        credito: "R$ 250.000",
        parcelas: "48x de R$ 1.200",
        prazo: "48 meses",
        entrada: "R$ 75.000",
        tipo: "contemplado",
        telefone: "(11) 97777-9876",
        valorCarta: "R$ 195.000",
        taxaAdministradora: "18,5% a.a.",
        fundoReserva: "R$ 12.500",
        saldoDevedor: "R$ 28.200",
        lance: "R$ 22.000",
        ativo: true,
      },
    ];

    sampleCards.forEach(card => {
      this.createCard(card);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllCards(): Promise<ConsortiumCard[]> {
    return Array.from(this.cards.values());
  }

  async getActiveCards(): Promise<ConsortiumCard[]> {
    return Array.from(this.cards.values()).filter(card => card.ativo);
  }

  async getCardById(id: string): Promise<ConsortiumCard | undefined> {
    return this.cards.get(id);
  }

  async createCard(insertCard: InsertConsortiumCard): Promise<ConsortiumCard> {
    const id = randomUUID();
    const card: ConsortiumCard = { 
      ...insertCard, 
      id,
      ativo: insertCard.ativo ?? true
    };
    this.cards.set(id, card);
    return card;
  }

  async updateCard(id: string, updates: UpdateConsortiumCard): Promise<ConsortiumCard | undefined> {
    const existingCard = this.cards.get(id);
    if (!existingCard) {
      return undefined;
    }

    const updatedCard: ConsortiumCard = { ...existingCard, ...updates };
    this.cards.set(id, updatedCard);
    return updatedCard;
  }

  async deleteCard(id: string): Promise<boolean> {
    return this.cards.delete(id);
  }
}

export const storage = new MemStorage();
