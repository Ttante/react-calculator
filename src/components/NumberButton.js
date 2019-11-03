import React, { useState } from 'react';

import './Button.scss'

function NumberButton ({ addNumber, customClass, number }) {
  const [isPressed, setIsPressed] = useState(false)

  // Number chars are displayed via CSS 
  return (
    <div
      data-number={String(number)}
      className={`btn number ${customClass} ${isPressed ? 'pressed' : ''}`}
      onPointerDown={() => { addNumber(number); setIsPressed(true)}}
      onPointerUp={() => {setIsPressed(false)}}
    >
    </div>
  )
}

export default NumberButton