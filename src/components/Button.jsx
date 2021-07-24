import React from 'react';
import './Button.css';

function Button({ text, click }) {
  return (
    <div className='button' onClick={click}>
      <div className='text'>{text}</div>
      <div className='text_border'></div>
    </div>
  );
}

export default Button;
