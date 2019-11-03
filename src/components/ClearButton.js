import React from 'react';

function ClearButton ({ clear }) {
  return (
    <div onPointerUp={ clear() }>
      C
    </div>
  )
}

export default ClearButton