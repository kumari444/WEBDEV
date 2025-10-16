const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const dataFile = path.join(__dirname, 'notes.json');

// Helper function to read notes
const readNotes = () => {
  try {
    const data = fs.readFileSync(dataFile);
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

// Helper function to write notes
const writeNotes = (notes) => {
  fs.writeFileSync(dataFile, JSON.stringify(notes, null, 2));
};

// GET all notes
app.get('/api/notes', (req, res) => {
  const notes = readNotes();
  res.json(notes);
});

// POST a new note
app.post('/api/notes', (req, res) => {
  const notes = readNotes();
  const newNote = { id: Date.now(), ...req.body };
  notes.push(newNote);
  writeNotes(notes);
  res.status(201).json(newNote);
});

// PUT update a note
app.put('/api/notes/:id', (req, res) => {
  const notes = readNotes();
  const id = parseInt(req.params.id);
  const index = notes.findIndex(note => note.id === id);
  if (index === -1) return res.status(404).json({ message: 'Note not found' });

  notes[index] = { id, ...req.body };
  writeNotes(notes);
  res.json(notes[index]);
});

// DELETE a note
app.delete('/api/notes/:id', (req, res) => {
  let notes = readNotes();
  const id = parseInt(req.params.id);
  notes = notes.filter(note => note.id !== id);
  writeNotes(notes);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
