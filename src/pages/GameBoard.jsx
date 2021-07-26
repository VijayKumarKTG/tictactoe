import React, { useState } from 'react';
import './GameBoard.css';
import Cell from '../components/Cell';
import Logo from '../components/Logo';
import X from '../components/X';
import O from '../components/O';
import Button from '../components/Button';

function Board({ addValueToCell, reset, playMode, cellVals, status }) {
  let winStatus;
  console.log(status);
  if (playMode === 'single') {
    if (status[0]) {
      winStatus = <p className='status'>You beat the beast, Computer!</p>;
    } else {
      winStatus = (
        <p className='status'>
          It is not easy to defeat the Computer but you can do it!
        </p>
      );
    }
  } else {
    if (status[0]) {
      winStatus = (
        <div className='status'>
          <p>Player 1, you surely win this time! Congrats!</p>
          <p>Don't worry Player 2! Make sure to win next time!</p>
        </div>
      );
    } else {
      winStatus = (
        <div className='status'>
          <p>Player 2, you are indeed a true tic-tac-toe hero.</p>
          <p>
            Player 1, failure is part of life but not for always. You will win!
          </p>
        </div>
      );
    }
  }

  return (
    <div className='tab board_container'>
      <Logo />
      {playMode === 'single' ? (
        <p>
          <span>You</span> Vs <span>Computer</span>
        </p>
      ) : (
        <p>
          <span>Player 1</span> Vs <span>Player 2</span>
        </p>
      )}
      <p>
        <span>
          <X /> : 1
        </span>{' '}
        🥊{' '}
        <span>
          <O /> : 1
        </span>
      </p>
      {status.includes(true) && winStatus}
      <div className='board'>
        {cellVals.map((cellVal, i) => (
          <Cell key={i} value={cellVal} addCellVal={() => addValueToCell(i)} />
        ))}
      </div>
      <Button text='Reset' click={reset} />
    </div>
  );
}

export default Board;
