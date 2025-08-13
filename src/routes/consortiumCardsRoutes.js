import { Router } from "express";
import consortiumCardsController from "../controllers/consortiumCardsController.js"

const router = Router();

router.post("/", consortiumCardsController.store)
router.get("/", consortiumCardsController.index)
router.get("/:id", consortiumCardsController.show)
router.put("/:id", consortiumCardsController.update)
router.delete("/:id", consortiumCardsController.destroy)

export default router;