import React from 'react';

function ClearButton ({ clear }) {
  return (
    <div onClick={clear()}>
      C
    </div>
  )
}

export default ClearButton