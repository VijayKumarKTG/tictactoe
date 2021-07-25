import React, { useState, useRef } from 'react';
import './App.css';
import Wrapper from '../components/Wrapper';
import PlayMode from './PlayMode';
import XorO from './XorO';
import Board from './GameBoard';
import { SwitchTransition, CSSTransition } from 'react-transition-group';

function App() {
  let [currentStep, setStep] = useState(0);
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

  const choosePlayMode = (mode) => {
    setPlayMode(mode);
    setStep(currentStep + 1);
  };

  const chooseXorO = (sign) => {
    setXorO(sign);
    setStep(currentStep + 1);
  };

  const addValueToCell = (index) => {
    setCellVals(cellVals.map((val, i) => (index === i ? xoro : val)));
    setXorO(xoro === 'X' ? 'O' : 'X');
    setCellChangeCount(
      cellChangeCount < 10 ? cellChangeCount + 1 : cellChangeCount
    );
  };

  const reset = () => {
    setStep(0);
    setPlayMode('');
    setXorO('');
    setCellVals([null, null, null, null, null, null, null, null, null]);
    setCellChangeCount(0);
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
                  reset={reset}
                  playMode={playMode}
                  cellVals={cellVals}
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
