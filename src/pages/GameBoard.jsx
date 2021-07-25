import React, { useState } from 'react';
import './GameBoard.css';
import Cell from '../components/Cell';
import Logo from '../components/Logo';
import X from '../components/X';
import O from '../components/O';
import Button from '../components/Button';

function Board({ addValueToCell, reset, playMode, cellVals }) {
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
