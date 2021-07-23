import React from 'react';
import './App.css';
import PlayMode from './PlayMode';
import XorO from './XorO';

function App() {
  return (
    <main>
      <h1><span className='x'>X</span>|<span class='o'>O</span></h1>
      <PlayMode/>
      <XorO/>
    </main>
  );
}

export default App;