import React from 'react';

const NoteList = ({ notes, onEdit, onDelete }) => {
  return (
    <ul className="note-list">
      {notes.map(note => (
        <li key={note.id} className="note-item">
          <div>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
          </div>
          <div className="flex-between">
            <button onClick={() => onEdit(note)}>Edit</button>
            <button onClick={() => onDelete(note.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
