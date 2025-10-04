import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage.js";
import {
  insertConsortiumCardSchema,
  updateConsortiumCardSchema,
} from "../shared/schema.js";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { authMiddleware } from "./auth.middleware.js";
const JWT_SECRET = "your-super-secret-key-that-should-be-in-env-vars";
export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication endpoints
  app.post("/api/auth/register", async (req, res) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res
          .status(400)
          .json({ message: "Username and password are required" });
      }

      // Check if user already exists
      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(409).json({ message: "User already exists" });
      }

      // Create new user
      const newUser = await storage.createUser({ username, password });
      res
        .status(201)
        .json({
          success: true,
          user: { id: newUser.id, username: newUser.username },
        });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res
          .status(400)
          .json({ message: "Username and password are required" });
      }

      const user = await storage.getUserByUsername(username);

      if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
        expiresIn: "1h",
      });

      res.json({
        success: true,
        token,
        user: { id: user.id, username: user.username },
      });
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

  app.post("/api/cards", authMiddleware, async (req, res) => {
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

  app.put("/api/cards/:id", authMiddleware, async (req, res) => {
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

  app.delete("/api/cards/:id", authMiddleware, async (req, res) => {
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
  app.get("/api/admin/cards", authMiddleware, async (req, res) => {
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
