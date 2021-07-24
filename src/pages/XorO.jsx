import React from 'react';
import Button from '../components/Button';
import X from '../components/X';
import O from '../components/O';

function XorO({ setStep, index }) {
  return (
    <div className='tab'>
      <p>
        What would you like, <X /> 🥊 <O /> ?
      </p>
      <div className='btn_container'>
        <Button text=' X ' click={() => setStep(index + 1)} />
        <Button text=' O ' click={() => setStep(index + 1)} />
      </div>
    </div>
  );
}

export default XorO;
