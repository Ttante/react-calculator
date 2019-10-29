import React, { useState } from 'react';

function OffButton ({ customClass, powerOff }) {
  const [isPressed, setIsPressed] = useState(false)
  return (
      <div
        className={`btn off ${customClass} ${isPressed ? 'pressed' : ''}`}
        onMouseDown={() => {setIsPressed(true)}}
        onMouseUp={() => {setIsPressed(false)} }
        onClick={() => { powerOff() }}>
      Off
    </div>
  )
}

export default OffButton