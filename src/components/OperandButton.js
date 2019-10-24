import React from 'react';

function OperandButton ({ operator, setOperation }) {
  return (
    <div onClick={setOperation(operator)}>
      {operator}
    </div>
  )
}

export default OperandButton
