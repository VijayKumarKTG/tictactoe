import React, { useState, useRef } from 'react';
import './App.css';
import Wrapper from '../components/Wrapper';
import PlayMode from './PlayMode';
import XorO from './XorO';
import Board from './GameBoard';
import { SwitchTransition, CSSTransition } from 'react-transition-group';

function App() {
  const [currentStep, setStep] = useState(0);
  const [playMode, setPlayMode] = useState('');
  const [xoro, setXorO] = useState('');
  const [cellVals, setCellVals] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  const [cellChangeCount, setCellChangeCount] = useState(0);
  const [winnerVal, setWinnerVal] = useState('');
  const [status, setStatus] = useState([false, false]);
  const [playerTurn, setPlayerTurn] = useState(Math.floor(Math.random() * 2));
  const [points, setPoints] = useState([0, 0]);

  const choosePlayMode = (mode) => {
    setPlayMode(mode);
    setStep(currentStep + 1);
  };

  const chooseXorO = (sign) => {
    setXorO(sign);
    setStep(currentStep + 1);
  };

  const addValueToCell = (index) => {
    if (!winnerVal) {
      setCellVals(() => {
        let newCellVals = cellVals.map((val, i) =>
          index === i ? (playerTurn === 0 ? 'X' : 'O') : val
        );
        let checkForX = checkXorO(newCellVals, 'X'),
          checkForO = checkXorO(newCellVals, 'O');
        if (!newCellVals.includes(null) && !checkForO && !checkForX) {
          setWinnerVal('draw');
          setStatus([true, true]);
        } else {
          if (checkForX) {
            setWinnerVal('X');
            setStatus(xoro === 'X' ? [true, false] : [false, true]);
            setPoints(
              xoro === 'X'
                ? [points[0] + 1, points[1]]
                : [points[0], points[1] + 1]
            );
          }
          if (checkForO) {
            setWinnerVal('O');
            setStatus(xoro === 'O' ? [true, false] : [false, true]);
            setPoints(
              xoro === 'O'
                ? [points[0] + 1, points[1]]
                : [points[0], points[1] + 1]
            );
          }
        }
        return newCellVals;
      });
      setPlayerTurn(playerTurn === 0 ? 1 : 0);
      setCellChangeCount(cellChangeCount + 1);
    }
  };

  const playAgain = () => {
    setCellVals([null, null, null, null, null, null, null, null, null]);
    setCellChangeCount(0);
    setWinnerVal('');
    setStatus([false, false]);
    setPlayerTurn(Math.floor(Math.random() * 2));
  };

  const reset = () => {
    setStep(0);
    setPlayMode('');
    setXorO('');
    setCellVals([null, null, null, null, null, null, null, null, null]);
    setCellChangeCount(0);
    setWinnerVal('');
    setStatus([false, false]);
    setPlayerTurn(Math.floor(Math.random() * 2));
    setPoints([0, 0]);
  };

  const checkXorO = (array, value) => {
    if (array[0] === value && array[1] === value && array[2] === value) {
      return true;
    } else if (array[3] === value && array[4] === value && array[5] === value) {
      return true;
    } else if (array[6] === value && array[7] === value && array[8] === value) {
      return true;
    } else if (array[0] === value && array[3] === value && array[6] === value) {
      return true;
    } else if (array[1] === value && array[4] === value && array[7] === value) {
      return true;
    } else if (array[2] === value && array[5] === value && array[8] === value) {
      return true;
    } else if (array[0] === value && array[4] === value && array[8] === value) {
      return true;
    } else if (array[2] === value && array[4] === value && array[6] === value) {
      return true;
    }
    return false;
  };

  return (
    <main>
      <SwitchTransition mode='out-in'>
        <CSSTransition
          key={currentStep}
          addEndListener={(node, done) => {
            node.addEventListener('transitionend', done, false);
          }}
          classNames='slideIn'>
          <div>
            <Wrapper>
              {currentStep == 0 ? (
                <PlayMode choosePlayMode={choosePlayMode} />
              ) : currentStep == 1 ? (
                <XorO chooseXorO={chooseXorO} />
              ) : (
                <Board
                  addValueToCell={addValueToCell}
                  playAgain={playAgain}
                  reset={reset}
                  playMode={playMode}
                  cellVals={cellVals}
                  status={status}
                  playerTurn={playerTurn}
                  player1Choice={xoro}
                  points={points}
                />
              )}
            </Wrapper>
          </div>
        </CSSTransition>
      </SwitchTransition>
    </main>
  );
}

export default App;
