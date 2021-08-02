import React, { useState, useEffect } from 'react';
import './App.css';
import Wrapper from '../components/Wrapper';
import PlayMode from './PlayMode';
import XorO from './XorO';
import Board from './GameBoard';
import { SwitchTransition, CSSTransition } from 'react-transition-group';

function App() {
  const [step, setStep] = useState(0);
  const [playMode, setPlayMode] = useState('');
  const [playersSign, setPlayerSigns] = useState([]);
  const [gameData, setGameData] = useState({
    cellVals: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    winner: '',
    status: [false, false],
    playerTurn: Math.floor(Math.random() * 2),
    points: [0, 0],
  });

  useEffect(() => {
    if (
      gameData.playerTurn === 1 &&
      playMode === 'single' &&
      playersSign.length
    ) {
      setTimeout(singlePlayerAddCell, 2000);
    }
  }, [playersSign, gameData, playMode]);

  const choosePlayMode = (mode) => {
    setPlayMode(mode);
    setStep(step + 1);
  };

  const chooseSymbols = (sign) => {
    setPlayerSigns(() => (sign === 'X' ? ['X', 'O'] : ['O', 'X']));
    setStep(step + 1);
  };

  const checkWinner = (array, value) => {
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

  const addValueToCell = (index) => {
    let newGameData = { ...gameData };
    if (!gameData.winner) {
      setGameData(() => {
        let newCellVals;
        newCellVals = gameData.cellVals.map((val, i) =>
          index === i ? playersSign[gameData.playerTurn] : val
        );
        let isWinnerX = checkWinner(newCellVals, 'X'),
          isWinnerO = checkWinner(newCellVals, 'O');
        if (!newCellVals.join('').match(/\d/g) && !isWinnerX && !isWinnerO) {
          newGameData.winner = 'draw';
          newGameData.status = [true, true];
        } else {
          if (isWinnerX) {
            newGameData.winner = 'X';
            newGameData.status =
              playersSign[0] === 'X' ? [true, false] : [false, true];
            newGameData.points =
              playersSign[0] === 'X'
                ? [gameData.points[0] + 1, gameData.points[1]]
                : [gameData.points[0], gameData.points[1] + 1];
          }
          if (isWinnerO) {
            newGameData.winner = 'O';
            newGameData.status =
              playersSign[0] === 'O' ? [true, false] : [false, true];
            newGameData.points =
              playersSign[0] === 'O'
                ? [gameData.points[0] + 1, gameData.points[1]]
                : [gameData.points[0], gameData.points[1] + 1];
          }
        }
        newGameData.playerTurn = gameData.playerTurn === 0 ? 1 : 0;
        newGameData.cellVals = newCellVals;
        return newGameData;
      });
    }
  };

  const singlePlayerAddCell = () => {
    let player = playersSign[gameData.playerTurn];
    let { index } = minimax([...gameData.cellVals], player);
    addValueToCell(index);
  };

  const minimax = (newBoard, player) => {
    // Get human player and AI player

    let huPlayer = playersSign[0];
    let aiPlayer = playersSign[1];

    // Extract all the available cells on the board
    var availSpots = emptyIndexies(newBoard);

    // Check if who win among human player and AI player or it is a draw
    if (checkWinner(newBoard, huPlayer)) {
      return { score: -10 };
    } else if (checkWinner(newBoard, aiPlayer)) {
      return { score: 10 };
    } else if (availSpots.length === 0) {
      return { score: 0 };
    }

    let moves = [];
    for (let i = 0; i < availSpots.length; i++) {
      let move = {};
      move.index = newBoard[availSpots[i]];
      newBoard[availSpots[i]] = player;
      if (player == aiPlayer) {
        let result = minimax(newBoard, huPlayer);
        move.score = result.score;
      } else {
        let result = minimax(newBoard, aiPlayer);
        move.score = result.score;
      }
      newBoard[availSpots[i]] = move.index;
      moves.push(move);
    }
    let bestMove;
    if (player === aiPlayer) {
      let bestScore = -10000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
      let bestScore = 10000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }
    return moves[bestMove];
  };

  const emptyIndexies = (board) =>
    board.filter((s) => s != 'O' && s != 'X' && typeof s === 'number');

  const playAgain = () => {
    let newGameData = { ...gameData };
    newGameData.cellVals = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    newGameData.winner = '';
    newGameData.status = [false, false];
    newGameData.playerTurn = Math.floor(Math.random() * 2);
    setGameData(newGameData);
  };

  const reset = () => {
    setStep(0);
    setPlayMode('');
    setPlayerSigns([]);
    let newGameData = { ...gameData };
    newGameData.cellVals = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    newGameData.winner = '';
    newGameData.status = [false, false];
    newGameData.playerTurn = Math.floor(Math.random() * 2);
    newGameData.points = [0, 0];
    setGameData(newGameData);
  };

  return (
    <main>
      <SwitchTransition mode='out-in'>
        <CSSTransition
          key={step}
          addEndListener={(node, done) => {
            node.addEventListener('transitionend', done, false);
          }}
          classNames='slideIn'>
          <div>
            <Wrapper>
              {step == 0 ? (
                <PlayMode choosePlayMode={choosePlayMode} />
              ) : step == 1 ? (
                <XorO chooseSymbols={chooseSymbols} />
              ) : (
                <Board
                  addValueToCell={addValueToCell}
                  playAgain={playAgain}
                  reset={reset}
                  playMode={playMode}
                  cellVals={gameData.cellVals}
                  status={gameData.status}
                  playerTurn={gameData.playerTurn}
                  points={gameData.points}
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
