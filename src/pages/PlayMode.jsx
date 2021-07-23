import React from 'react';
import Button from '../components/Button';

function PlayMode(){
  return (
    <div>
      <p>Single player or double player?</p>
      <Button text="Single Player"/>
      <Button text="Double Player"/>
    </div>
  )
}

export default PlayMode;