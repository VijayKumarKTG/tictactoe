import React from 'react';
import Button from '../components/Button';
import X from '../components/X';
import O from '../components/O';

function XorO({ chooseXorO }) {
  return (
    <div className='tab'>
      <p>
        What would you like, <X /> 🥊 <O /> ?
      </p>
      <div className='btn_container'>
        <Button text=' X ' click={() => chooseXorO('X')} />
        <Button text=' O ' click={() => chooseXorO('O')} />
      </div>
    </div>
  );
}

export default XorO;
