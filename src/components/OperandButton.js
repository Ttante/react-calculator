import React, { useState } from 'react';

function OperandButton ({ customClass, operator, setOperation }) {
  const [isPressed, setIsPressed] = useState(false)
  return (
    <div
      className={`btn operand ${customClass} ${isPressed ? 'pressed' : ''}`}
      onClick={() => { setOperation(operator)} }
      onMouseDown={() => {setIsPressed(true)}}
      onMouseUp={() => {setIsPressed(false)}}
    >
      {operator}
    </div>
  )
}

export default OperandButton
