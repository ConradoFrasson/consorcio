import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertConsortiumCardSchema, updateConsortiumCardSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication endpoints
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }

      const user = await storage.getUserByUsername(username);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // In a real app, you'd use proper session management
      res.json({ success: true, user: { id: user.id, username: user.username } });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Consortium cards endpoints
  app.get("/api/cards", async (req, res) => {
    try {
      const cards = await storage.getActiveCards();
      res.json(cards);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch cards" });
    }
  });

  app.get("/api/cards/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const card = await storage.getCardById(id);
      
      if (!card) {
        return res.status(404).json({ message: "Card not found" });
      }

      res.json(card);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch card" });
    }
  });

  app.post("/api/cards", async (req, res) => {
    try {
      const validatedData = insertConsortiumCardSchema.parse(req.body);
      const card = await storage.createCard(validatedData);
      res.status(201).json(card);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Failed to create card" });
      }
    }
  });

  app.put("/api/cards/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = updateConsortiumCardSchema.parse(req.body);
      const updatedCard = await storage.updateCard(id, validatedData);
      
      if (!updatedCard) {
        return res.status(404).json({ message: "Card not found" });
      }

      res.json(updatedCard);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Failed to update card" });
      }
    }
  });

  app.delete("/api/cards/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteCard(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Card not found" });
      }

      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete card" });
    }
  });

  // Admin endpoints - get all cards including inactive
  app.get("/api/admin/cards", async (req, res) => {
    try {
      const cards = await storage.getAllCards();
      res.json(cards);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch cards" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
