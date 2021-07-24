import React from 'react';
import { useState } from 'react';
import './App.css';
import Wrapper from '../components/Wrapper';
import PlayMode from './PlayMode';
import XorO from './XorO';
import Board from './GameBoard';
import { CSSTransition } from 'react-transition-group';

function App() {
  let [currentStep, setStep] = useState(0);
  let steps = [<PlayMode />, <XorO />, <Board />];
  return (
    <main>
      {/* {steps.map((step, i) =>
        i == currentStep ? ( */}
      <CSSTransition
        in={currentStep == 0}
        timeout={300}
        classNames='slideIn'
        unmountOnExit>
        <Wrapper index={0} setStep={setStep}>
          <PlayMode />
        </Wrapper>
      </CSSTransition>
      <CSSTransition
        in={currentStep == 1}
        timeout={300}
        classNames='slideIn'
        unmountOnExit>
        <Wrapper index={1} setStep={setStep}>
          <XorO />
        </Wrapper>
      </CSSTransition>
      <CSSTransition
        in={currentStep == 2}
        timeout={300}
        classNames='slideIn'
        unmountOnExit>
        <Wrapper index={2} setStep={setStep}>
          <Board />
        </Wrapper>
      </CSSTransition>
      {/* ) : null
      )} */}
    </main>
  );
}

export default App;
