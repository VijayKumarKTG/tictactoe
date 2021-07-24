import React from 'react';
import './PlayMode.css';
import Button from '../components/Button';
import Logo from '../components/Logo';

function PlayMode({ setStep, index }) {
  return (
    <div className='tab'>
      <Logo />
      <p>Welcome to your tic-tac-toe board! 👋</p>
      <p>Choose, single player or double player?</p>
      <div className='btn_container'>
        <Button text='Single player' click={() => setStep(index + 1)} />
        <Button text='Double player' click={() => setStep(index + 1)} />
      </div>
    </div>
  );
}

export default PlayMode;
