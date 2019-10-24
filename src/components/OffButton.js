import React from 'react';

function OffButton ({ powerOff }) {
  return (
    <div onClick={powerOff()}>
      Off
    </div>
  )
}

export default OffButton