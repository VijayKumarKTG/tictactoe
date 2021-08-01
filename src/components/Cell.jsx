import React from 'react';
import './Cell.css';
import X from '../components/X';
import O from '../components/O';

function Cell(props) {
  return (
    <div className='cell' onClick={props.value ? null : props.addCellVal}>
      {props.value ? (
        props.value === 'X' ? (
          <X />
        ) : props.value === 'O' ? (
          <O />
        ) : (
          ''
        )
      ) : (
        ''
      )}
    </div>
  );
}

export default Cell;
