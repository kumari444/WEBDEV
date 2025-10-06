import React from 'react';
import RandomVerse from './RandomVerse.jsx';
import SpecificVerse from './SpecificVerse.jsx';

function App() {
  return (
    <div className="app-container">
      <h1>Bible Verse App</h1>
      <RandomVerse />
      <SpecificVerse />
    </div>
  );
}

export default App;
