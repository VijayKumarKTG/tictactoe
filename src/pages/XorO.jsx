import React from 'react';
import Button from '../components/Button';
import X from '../components/X';
import O from '../components/O';
import Logo from '../components/Logo';

function XorO({ chooseSymbols }) {
  return (
    <div className='tab'>
      <Logo />
      <p>
        What would you like, <X /> 🥊 <O /> ?
      </p>
      <div className='btn_container'>
        <Button text=' X ' click={() => chooseSymbols('X')} />
        <Button text=' O ' click={() => chooseSymbols('O')} />
      </div>
    </div>
  );
}

export default XorO;
