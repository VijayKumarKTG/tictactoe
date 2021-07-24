import React from 'react';
import './Cell.css';
import X from '../components/X';
import O from '../components/O';

function Cell(props) {
  return (
    <div className='cell'>
      {props.value ? props.value === 'X' ? <X /> : <O /> : ''}
    </div>
  );
}

export default Cell;
