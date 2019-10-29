import React, { useState } from 'react';

function DecimalButton ({ addDecimal, customClass }) {
  const [isPressed, setIsPressed] = useState(false)
  return (
    <div
      className={`btn decimal bottom-row ${customClass} ${isPressed ? 'pressed' : ''}`}
      onClick={() => { addDecimal()} }
      onMouseDown={() => {setIsPressed(true)}}
      onMouseUp={() => {setIsPressed(false)}}
    >
      .
    </div>
  )
}

export default DecimalButton