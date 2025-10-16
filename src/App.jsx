import React from 'react';
import NotesList from './NotesList';
import './app.css';
import RandomVerse from './RandomVerse.jsx';
import SpecificVerse from './SpecificVerse.jsx';

function App() {
  return (
    <div className="app-container">
      <h1>Bible Verse App</h1>
      <RandomVerse />
      <SpecificVerse />

      {/* Add this to show your notes UI */}
      <NotesList />
    </div>
  );
}

export default App;
