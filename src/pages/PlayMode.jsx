import React from 'react';
import './PlayMode.css';
import Button from '../components/Button';
import Logo from '../components/Logo';

function PlayMode({ choosePlayMode }) {
  return (
    <div className='tab'>
      <Logo />
      <p>Welcome to your tic-tac-toe board! 👋</p>
      <p>Choose, single player or double player?</p>
      <div className='btn_container'>
        <Button text='Single player' click={() => choosePlayMode('single')} />
        <Button text='Double player' click={() => choosePlayMode('double')} />
      </div>
    </div>
  );
}

export default PlayMode;
