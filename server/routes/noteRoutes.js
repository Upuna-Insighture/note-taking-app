import { Router } from 'express';
import * as NoteController from '../controllers/noteController.js';

const router = Router();

router.post('/notes', NoteController.createNote);
router.get('/notes', NoteController.getNotes);
router.put('/notes/:id', NoteController.updateNote);
router.delete('/notes/:id', NoteController.deleteNote);

export default router;
