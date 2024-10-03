import * as NoteModel from '../models/noteModel.js';

export const getNotes = async () => {
  return await NoteModel.getAllNotes();
};

export const getNote = async (id) => {
  return await NoteModel.getNoteById(id);
};

export const addNote = async (title, content) => {
  if (!title || !content) throw new Error('Title and Content are required');
  return await NoteModel.createNote(title, content);
};

export const modifyNote = async (id, title, content) => {
  if (!title || !content) throw new Error('Title and Content are required');
  return await NoteModel.updateNote(id, title, content);
};

export const removeNote = async (id) => {
  await NoteModel.deleteNote(id);
};

