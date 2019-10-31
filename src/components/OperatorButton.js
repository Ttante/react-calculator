import React, { useState } from 'react';

function OperandButton ({ customClass, operator, setOperation }) {
  const [isPressed, setIsPressed] = useState(false)
  return (
    <div
      className={`btn operand ${customClass} ${isPressed ? 'pressed' : ''}`}
      // onPointerDown={() => { console.log('click'); setOperation(operator)} }
      onPointerDown={() => { setOperation(operator); setIsPressed(true)}}
      onPointerUp={() => {setIsPressed(false)}}
    >
      {/* {operator} */}
    </div>
  )
}

export default OperandButton
