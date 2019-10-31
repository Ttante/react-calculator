import React, { useState } from 'react';

import './Button.scss'

function NumberButton ({ addNumber, customClass, number }) {
  const [isPressed, setIsPressed] = useState(false)
  return (
    <div
      data-number={String(number)}
      className={`btn number ${customClass} ${isPressed ? 'pressed' : ''}`}
      // onClick={() => { console.log('number: ', number); addNumber(number)} }
      onPointerDown={() => { addNumber(number); setIsPressed(true)}}
      onPointerUp={() => {setIsPressed(false)}}
    >
    </div>
  )
}

export default NumberButton