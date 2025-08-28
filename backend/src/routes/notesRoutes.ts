import express from "express";
import { middleware } from "../middlewares/userMiddleware.js";
import { delController, createController, getController, getSpecificController } from "../controllers/notesController.js";


const router = express.Router();

router.post("/create", middleware, createController);

router.get("/", middleware, getController);

router.get("/:id", middleware, getSpecificController);

router.delete("/:id", middleware, delController);

export default router;
