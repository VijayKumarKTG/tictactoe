import React from 'react';
import './GameBoard.css';
import Cell from '../components/Cell';
import Logo from '../components/Logo';
import X from '../components/X';
import O from '../components/O';

function Board() {
  let cellVals = [null, null, 'X', null, null, 'O', null, null, null];
  let keys = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div className='board_container'>
      <Logo />
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
          <Cell key={keys[i]} value={cellVal} />
        ))}
      </div>
    </div>
  );
}

export default Board;
