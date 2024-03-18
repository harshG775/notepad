import express from "express";
import notesController from "../controllers/notes.controller.js";
const router = express.Router();
router.post("/create", notesController.create);
router.get("/", notesController.getAllNotes);
router.get("/:id", notesController.getNoteById);
router.post("/id", notesController.updateNoteById);
router.post("/id", notesController.deleteNoteById);
export default router;