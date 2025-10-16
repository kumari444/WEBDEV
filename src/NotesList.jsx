import React, { useState, useEffect } from 'react';
import AddNoteForm from './AddNoteForm';

function NotesList() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);   // Track which note is being edited
  const [editTitle, setEditTitle] = useState('');         // Editable title state
  const [editContent, setEditContent] = useState('');     // Editable content state

  const fetchNotes = () => {
    fetch('http://localhost:5000/api/notes')
      .then(res => res.json())
      .then(data => setNotes(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleNoteAdded = (newNote) => {
    setNotes(prev => [...prev, newNote]);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/notes/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setNotes(prev => prev.filter(note => note.id !== id));
      })
      .catch(err => console.error('Delete failed:', err));
  };

  // Start editing a note - populate fields with current data
  const startEdit = (note) => {
    setEditingNote(note.id);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  // Save edited note to backend and update state
  const saveEdit = (id) => {
    fetch(`http://localhost:5000/api/notes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: editTitle, content: editContent }),
    })
      .then(res => res.json())
      .then(updatedNote => {
        setNotes(prevNotes =>
          prevNotes.map(note => (note.id === id ? updatedNote : note))
        );
        setEditingNote(null);
      })
      .catch(err => console.error('Update failed:', err));
  };

  return (
    <div>
      <AddNoteForm onNoteAdded={handleNoteAdded} />
      <h2>Notes</h2>
      {notes.length === 0 && <p>No notes found.</p>}
      <ul>
        {notes.map(note => (
          <li key={note.id}>
            {editingNote === note.id ? (
              <>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <input
                  type="text"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />
                <button onClick={() => saveEdit(note.id)}>Save</button>
                <button onClick={() => setEditingNote(null)}>Cancel</button>
              </>
            ) : (
              <>
                <strong>{note.title}</strong>: {note.content}
                <button
                  onClick={() => startEdit(note)}
                  style={{ marginLeft: '10px' }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(note.id)}
                  style={{ marginLeft: '10px' }}
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NotesList;
