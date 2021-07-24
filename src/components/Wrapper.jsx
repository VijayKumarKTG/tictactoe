import React, { cloneElement } from 'react';
import './Wrapper.css';

export default function Wrapper(props) {
  let children = cloneElement(props.children, {
    index: props.index,
    setStep: props.setStep,
  });
  return <div className='wrapper'>{children}</div>;
}
