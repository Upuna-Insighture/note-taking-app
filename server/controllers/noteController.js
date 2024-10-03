import * as NoteService from '../services/noteService.js';

export const getNotes = async (req, res) => {
  try {
    const notes = await NoteService.getNotes();
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch notes' });
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = await NoteService.addNote(title, content);
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: 'Unable to create note' });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const note = await NoteService.modifyNote(id, title, content);
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: 'Unable to update note' });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    await NoteService.removeNote(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Unable to delete note' });
  }
};
