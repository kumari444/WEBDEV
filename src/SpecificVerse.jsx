import React, { useState } from 'react';

function SpecificVerse() {
  const [input, setInput] = useState('');
  const [verse, setVerse] = useState('');

  const getSpecificVerse = async () => {
    if (!input.trim()) {
      setVerse('Please enter a valid verse reference (e.g., John 3:16)');
      return;
    }
    try {
      const passage = input.trim().replace(' ', '+');
      const response = await fetch(`https://labs.bible.org/api/?passage=${passage}&type=json`);
      const data = await response.json();

      if (data.length === 0) {
        setVerse('Verse not found. Please check your input.');
      } else {
        const verseText = `${data[0].bookname} ${data[0].chapter}:${data[0].verse} - ${data[0].text}`;
        setVerse(verseText);
      }
    } catch (error) {
      setVerse('Failed to load verse.');
      console.error('Error fetching verse:', error);
    }
  };

  return (
    <div>
      <input 
        type="text" 
        placeholder="Enter verse (e.g., John 3:16)" 
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={getSpecificVerse}>Get Verse</button>
      <p>{verse}</p>
    </div>
  );
}

export default SpecificVerse;
