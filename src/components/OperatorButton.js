import React, { useState } from 'react';

function OperandButton ({ customClass, operator, setOperation }) {
  const [isPressed, setIsPressed] = useState(false)
  // Operator char is displayed with CSS
  return (
    <div
      className={`btn operand ${customClass} ${isPressed ? 'pressed' : ''}`}
      onPointerDown={() => { setOperation(operator); setIsPressed(true)}}
      onPointerUp={() => {setIsPressed(false)}}
    />
  )
}

export default OperandButton
