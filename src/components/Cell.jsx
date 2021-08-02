import React from 'react';
import './Cell.css';
import X from '../components/X';
import O from '../components/O';

function Cell({ value, addCellVal }) {
  return (
    <div
      className='cell'
      onClick={
        value == 'X' || value == 'O' ? () => console.log(value) : addCellVal
      }>
      {value ? value === 'X' ? <X /> : value === 'O' ? <O /> : '' : ''}
    </div>
  );
}

export default Cell;
