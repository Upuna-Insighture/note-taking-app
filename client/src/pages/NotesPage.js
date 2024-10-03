import { useState } from 'react';
import { fetchNotes, createNote, updateNote, deleteNote } from '../api/noteApi';
import NoteList from '../components/NoteList';
import NoteForm from '../components/NoteForm';
import useFetch from '../hooks/useFetch';
import Navbar from '../components/Navbar';

const NotesPage = ({ user, onLogout }) => {
  const { data: notes, loading, error } = useFetch(fetchNotes);
  const [editingNote, setEditingNote] = useState(null);

  const handleCreate = async (note) => {
    await createNote(note);
    window.location.reload();
  };

  const handleEdit = async (note) => {
    await updateNote(editingNote.id, note);
    window.location.reload();
  };

  const handleDelete = async (id) => {
    await deleteNote(id);
    window.location.reload();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <Navbar user={user} onLogout={onLogout} />
      <div>
        <NoteForm
          onSubmit={editingNote ? handleEdit : handleCreate}
          note={editingNote}
        />
        <NoteList
          notes={notes}
          onDelete={handleDelete}
          onEdit={setEditingNote}
        />
      </div>
    </div>
  );
};

export default NotesPage;
