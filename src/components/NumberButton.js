import React from 'react';

import './Button.scss'

function NumberButton ({ addNumber, number }) {
  return (
    <div onClick={addNumber(number)}>
      {number}
    </div>
  )
}

export default NumberButton