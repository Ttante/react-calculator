import React, { useState } from 'react';

import './Button.scss'

function NumberButton ({ addNumber, customClass, number }) {
  const [isPressed, setIsPressed] = useState(false)
  return (
    <div
      className={`btn number ${customClass} ${isPressed ? 'pressed' : ''}`}
      onClick={() => { console.log('number: ', number); addNumber(number)} }
      onMouseDown={() => {setIsPressed(true)}}
      onMouseUp={() => {setIsPressed(false)}}
    >
      {number}
    </div>
  )
}

export default NumberButton