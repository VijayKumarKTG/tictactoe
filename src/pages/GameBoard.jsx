import React, { useState } from 'react';
import './GameBoard.css';
import Cell from '../components/Cell';
import Logo from '../components/Logo';
import X from '../components/X';
import O from '../components/O';
import Button from '../components/Button';

function Board({
  addValueToCell,
  playAgain,
  reset,
  playMode,
  cellVals,
  status,
  playerTurn,
  playersSign,
  points,
}) {
  let winStatus;
  let xSign = playersSign[0] === 'X' ? <X /> : <O />,
    oSign = playersSign[1] === 'X' ? <X /> : <O />;

  if (playMode === 'single') {
    if (status[0] && !status[1]) {
      winStatus = <p className='status'>You beat the beast, Computer!</p>;
    } else if (!status[0] && status[1]) {
      winStatus = (
        <p className='status'>
          It is not easy to defeat the Computer but you can do it!
        </p>
      );
    } else if (status[0] && status[1]) {
      winStatus = <p className='status'>It is a draw! :)</p>;
    }
  } else {
    if (status[0] && !status[1]) {
      winStatus = (
        <div className='status'>
          <p>Player 1, you surely win this time! Congrats!</p>
          <p>Don't worry Player 2! Make sure to win next time!</p>
        </div>
      );
    } else if (!status[0] && status[1]) {
      winStatus = (
        <div className='status'>
          <p>Player 2, you are indeed a true tic-tac-toe hero.</p>
          <p>
            Player 1, failure is part of life but not for always. You will win!
          </p>
        </div>
      );
    } else if (status[0] && status[1]) {
      winStatus = <p className='status'>It is a draw! :)</p>;
    }
  }

  return (
    <div className='tab board_container'>
      <Logo />
      {playMode === 'single' ? (
        <div className='points'>
          <div>
            <p className={playerTurn === 0 ? 'active' : null}>You</p>
            <p>
              {xSign} : {points[0]}
            </p>
          </div>
          <div>🥊</div>
          <div>
            <p className={playerTurn === 1 ? 'active' : null}>Computer</p>
            <p>
              {oSign} : {points[1]}
            </p>
          </div>
        </div>
      ) : (
        <div className='points'>
          <div>
            <p className={playerTurn === 0 ? 'active' : null}>Player 1</p>
            <p>
              {xSign} : {points[0]}
            </p>
          </div>
          <div>🥊</div>
          <div>
            <p className={playerTurn === 1 ? 'active' : null}>Player 2</p>
            <p>
              {oSign} : {points[1]}
            </p>
          </div>
        </div>
      )}
      {status.includes(true) && winStatus}
      <div className='board'>
        {cellVals.map((cellVal, i) => (
          <Cell
            key={i}
            value={cellVal}
            addCellVal={() =>
              playerTurn === 1 && playMode === 'single'
                ? null
                : addValueToCell(i)
            }
          />
        ))}
      </div>
      <div className='btn_container' style={{ marginTop: '20px' }}>
        <Button text='Play again' click={playAgain} />
        <Button text='Reset' click={reset} />
      </div>
    </div>
  );
}

export default Board;
