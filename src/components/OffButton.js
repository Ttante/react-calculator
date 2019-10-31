import React, { useState } from 'react';

function OffButton ({ customClass, powerOff }) {
  const [isPressed, setIsPressed] = useState(false)
  return (
      <div
        className={`btn off ${customClass} ${isPressed ? 'pressed' : ''}`}
        onPointerDown={() => {setIsPressed(true)}}
        onPointerUp={() => { powerOff(); setIsPressed(false)} }>
    </div>
  )
}

export default OffButton