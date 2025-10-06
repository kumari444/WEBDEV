import React, { useState } from 'react';

function RandomVerse() {
  const [verse, setVerse] = useState('');

  const getRandomVerse = async () => {
    try {
      const response = await fetch('https://labs.bible.org/api/?passage=random&type=json');
      const data = await response.json();
      const verseText = `${data[0].bookname} ${data[0].chapter}:${data[0].verse} - ${data[0].text}`;
      setVerse(verseText);
    } catch (error) {
      setVerse('Failed to load verse.');
      console.error('Error fetching verse:', error);
    }
  };

  return (
    <div>
      <button onClick={getRandomVerse}>Get Random Verse</button>
      <p>{verse}</p>
    </div>
  );
}

export default RandomVerse;
