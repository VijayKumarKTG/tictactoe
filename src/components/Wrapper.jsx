import React, { cloneElement } from 'react';
import './Wrapper.css';

export default function Wrapper(props) {
  return <div className='wrapper'>{props.children}</div>;
}
