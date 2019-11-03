import React, { useState } from 'react';
import numeral from 'numeral'
import { evaluate } from 'mathjs'

import NumberButton from './NumberButton';
import OffButton from './OffButton';
import DecimalButton from './DecimalButton';
import OperatorButton from './OperatorButton';

import './Calculator.scss';

function Calculator () {
  const [displayValue, setDisplayValue] = useState('')
  const [currentOperation, setCurrentOperation] = useState(null)
  const [pressedBtn, setPressedBtn] = useState('')
  const [expression, setExpression] = useState('')
  const [initialValue, setInitialValue] = useState(0)

  const zeroTotal = (val) => {
    // is a float if false
    return parseFloat(val) - parseInt(val) === 0
  }

  const endsWithDecimal = (val) => {
    return displayValue && '.' === displayValue.slice(-1)
  }

  const addDecimalToDisplay = () => {
    if (displayValue && displayValue.includes('.')) {
      return
    }

    if (!displayValue || zeroTotal(displayValue)) {
      if (!displayValue || !endsWithDecimal(displayValue)) {
        setDisplayValue((displayValue || '0') + '.')
      }
    }
  }

  const addNumber = (num) => {
    // add number to text display
    if (null === currentOperation) {
      setExpression('')
      setInitialValue(0)
    }
    if (displayValue === '0') {
      setDisplayValue(num)
    } else {
      setDisplayValue(displayValue + num)
    }
  }

  const clearCalculator = () => {
    setCurrentOperation(null)
    setDisplayValue('0')
    setInitialValue(0)
    setExpression('')
  }

  const handleEquals = () => {
    const intermediateExpression = expression + displayValue  
    setCurrentOperation(null)
    
    try {
      let result = evaluate(intermediateExpression)
      if (!Number.isFinite(result) || Number.isNaN(result)) {
        result = 0
      }

      setInitialValue(result)
      setExpression(result)
      setDisplayValue('')
    } catch (err) {
      console.log(err)
    }
  }

  const handleTextChange = (val) => {
    const allowedValues = /[0-9|+|-|*|/|%|.]+/g

    if (val && !allowedValues.test(val)) {
      return null
    }

    if (null === currentOperation) {
      setExpression('')
    }

    setDisplayValue(val)
    setCurrentOperation(null)
  }

  const setOperation = (operation) => {
    const endsWithOperator = /[+|%|*|-|\/]$/;
    let operationInput = operation
    
    if ('%' === operation) {
      operationInput = '*0.01*'
    }
    
    setCurrentOperation(operationInput)

    let intermediateExpression = expression + displayValue
    
    if (endsWithOperator.test(intermediateExpression)) {
      const exp = intermediateExpression.substring(0, intermediateExpression.length - 1)
      setExpression(exp + operationInput)
    } else {
      try {
        let result = evaluate(intermediateExpression)
        if (!Number.isFinite(result) || Number.isNaN(result)) {
          result = 0
        }
        setInitialValue(result)
      } catch (err) {
        console.log(err)
      }
      setExpression(intermediateExpression + operationInput)
    }

    setDisplayValue('')
  }

  const turnOffCalculator = () => {
    setDisplayValue('')
    setInitialValue(0)
    setCurrentOperation(null)
  }

  const placeholderFormat = (val) => {
    // handle scientific notation for big decimals
    if (val) {
      let decimals = 0
      try {
        decimals = String(val).split('.')[1].length || 0
      } catch (err) {}
      return numeral(val).format(decimals < 24 ? '0,0.'+Array(decimals).fill(0).join('') : '0,0.0e+0') 
    }
  }

  return (
    <div className="calculator">
      <input
        type="text"
        className="display"
        onChange={(e) => { handleTextChange(e.target.value) } }
        value={ displayValue }
        placeholder={ placeholderFormat(initialValue) || '0' }
      />

      <div className="btn-wrap">
        <OffButton customClass="grid-1 off" powerOff={turnOffCalculator.bind(this)} />
        
        <div
          className={`btn clear grid-2 ${pressedBtn === 'clear' ? 'pressed' : ''}`}
          onPointerDown={() => { setPressedBtn('clear') }}
          onPointerUp={() => { clearCalculator(); setPressedBtn('') }}
        />
        
        <OperatorButton operator="%" customClass="grid-3 percent" setOperation={ setOperation } />
        <OperatorButton operator="/" customClass="grid-4 divide" setOperation={ setOperation } />
        
        <NumberButton number="7" customClass="grid-5" addNumber={ addNumber } />
        <NumberButton number="8" customClass="grid-6" addNumber={ addNumber } />
        <NumberButton number="9" customClass="grid-7" addNumber={ addNumber } />
        
        <OperatorButton operator="*" customClass="grid-8 multiply" setOperation={setOperation.bind(this)} />
        
        <NumberButton number="4" customClass="grid-9" addNumber={ addNumber } />
        <NumberButton number="5" customClass="grid-10" addNumber={ addNumber } />
        <NumberButton number="6" customClass="grid-11" addNumber={ addNumber } />
        
        <OperatorButton operator="-" customClass="grid-12 minus" setOperation={setOperation.bind(this)} />
        
        <NumberButton number="1" customClass="grid-13" addNumber={ addNumber } />
        <NumberButton number="2" customClass="grid-14" addNumber={ addNumber } />
        <NumberButton number="3" customClass="grid-15" addNumber={ addNumber } />
        
        <OperatorButton operator="+" customClass="grid-16 plus" setOperation={setOperation} />

        <NumberButton number="0" customClass="grid-17" addNumber={ addNumber } />
        
        <DecimalButton customClass="grid-18" addDecimal={addDecimalToDisplay} />

        <div
          className={`btn equals grid-19 ${pressedBtn === 'equals' ? 'pressed' : ''}`}
          onClick={() => { handleEquals() }}
          onMouseDown={() => { setPressedBtn('equals') }}
          onMouseUp={() => { setPressedBtn('') }}
        />
      </div>
    </div>
  )
}

export default Calculator