import { Router } from "express";
import consortiumCardsController from "../controllers/consortiumCardsControllers.js";

const router = Router();

// Public routes
router.get("/", consortiumCardsController.index);           // Get active cards
router.get("/:id", consortiumCardsController.show);        // Get single card

// Admin routes (these will need authentication middleware)
router.post("/", consortiumCardsController.store);         // Create card
router.put("/:id", consortiumCardsController.update);      // Update card
router.delete("/:id", consortiumCardsController.destroy);  // Delete card

// Admin-only route to get all cards (including inactive)
router.get("/admin/all", consortiumCardsController.getAllCards);

export default router;