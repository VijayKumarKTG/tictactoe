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
  const [cellVals, setCellVals] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8]);
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

  const checkXorO = (array, value) => {
    if (
      (array[0] === value && array[1] === value && array[2] === value) ||
      (array[3] === value && array[4] === value && array[5] === value) ||
      (array[6] === value && array[7] === value && array[8] === value) ||
      (array[0] === value && array[3] === value && array[6] === value) ||
      (array[1] === value && array[4] === value && array[7] === value) ||
      (array[2] === value && array[5] === value && array[8] === value) ||
      (array[0] === value && array[4] === value && array[8] === value) ||
      (array[2] === value && array[4] === value && array[6] === value)
    ) {
      return true;
    }
    return false;
  };

  const singlePlayerAddCell = () => {
    let player = playerTurn === 0 ? xoro : xoro === 'X' ? 'O' : 'X';
    let obj = minimax([...cellVals], player);
    addValueToCell(obj.index);
  };

  // the main minimax function
  function minimax(newBoard, player) {
    let huPlayer = xoro;
    let aiPlayer = xoro === 'X' ? 'O' : 'X';
    //add one to function calls
    //fc++;

    //available spots
    var availSpots = emptyIndexies(newBoard);

    // checks for the terminal states such as win, lose, and tie and returning a value accordingly
    if (checkXorO(newBoard, huPlayer)) {
      return { score: -10 };
    } else if (checkXorO(newBoard, aiPlayer)) {
      return { score: 10 };
    } else if (availSpots.length === 0) {
      return { score: 0 };
    }

    // an array to collect all the objects
    var moves = [];

    // loop through available spots
    for (var i = 0; i < availSpots.length; i++) {
      //create an object for each and store the index of that spot that was stored as a number in the object's index key
      var move = {};
      move.index = newBoard[availSpots[i]];

      // set the empty spot to the current player
      newBoard[availSpots[i]] = player;

      //if collect the score resulted from calling minimax on the opponent of the current player
      if (player == aiPlayer) {
        var result = minimax(newBoard, huPlayer);
        move.score = result.score;
      } else {
        var result = minimax(newBoard, aiPlayer);
        move.score = result.score;
      }

      //reset the spot to empty
      newBoard[availSpots[i]] = move.index;

      // push the object to the array
      moves.push(move);
    }

    // if it is the computer's turn loop over the moves and choose the move with the highest score
    var bestMove;
    if (player === aiPlayer) {
      var bestScore = -10000;
      for (var i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
      // else loop over the moves and choose the move with the lowest score
      var bestScore = 10000;
      for (var i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }

    // return the chosen move (object) from the array to the higher depth
    return moves[bestMove];
  }

  // returns the available spots on the board
  function emptyIndexies(board) {
    return board.filter((s) => s != 'O' && s != 'X');
  }

  const addValueToCell = (index) => {
    if (!winnerVal) {
      setCellVals(() => {
        let newCellVals = cellVals.map((val, i) =>
          index === i ? (playerTurn === 0 ? 'X' : 'O') : val
        );
        let checkForX = checkXorO(newCellVals, 'X'),
          checkForO = checkXorO(newCellVals, 'O');
        if (
          !newCellVals.join('').match(/\d/).length &&
          !checkForO &&
          !checkForX
        ) {
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

  if (playerTurn === 1 && currentStep === 2 && playMode === 'single') {
    setTimeout(singlePlayerAddCell, 1000);
  }

  const playAgain = () => {
    setCellVals([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    setCellChangeCount(0);
    setWinnerVal('');
    setStatus([false, false]);
    setPlayerTurn(Math.floor(Math.random() * 2));
  };

  const reset = () => {
    setStep(0);
    setPlayMode('');
    setXorO('');
    setCellVals([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    setCellChangeCount(0);
    setWinnerVal('');
    setStatus([false, false]);
    setPlayerTurn(Math.floor(Math.random() * 2));
    setPoints([0, 0]);
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
