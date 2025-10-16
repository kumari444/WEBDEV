import React, { useState } from 'react';

function AddNoteForm({ onNoteAdded }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newNote = { title, content };

    fetch('http://localhost:5000/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newNote),
    })
      .then(res => res.json())
      .then(data => {
        onNoteAdded(data);
        setTitle('');
        setContent('');
      })
      .catch(err => console.error('Error adding note:', err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Note</h3>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <br />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <br />
      <button type="submit">Add Note</button>
    </form>
  );
}

export default AddNoteForm;
