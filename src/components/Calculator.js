import React, { useState } from 'react';


import NumberButton from './NumberButton';
import OffButton from './OffButton';
import DecimalButton from './DecimalButton';
import OperandButton from './OperandButton';

import './calculator.scss';

const MAX_DISPLAY_LENGTH = 10

function Calculator () {
  const [displayValue, setDisplayValue] = useState('')
  const [previousValue, setPreviousValue] = useState('')
  const [currentOperation, setCurrentOperation] = useState('')
  // const [previousOperation, setPreviousOperation] = useState('')

  const addDecimalPoint = () => {
    if (!displayValue.includes('.') && atMaxDisplayLength()) {
      setDisplayValue(displayValue + '.')
    }
  }

  const addNumber = (num) => {
    if (displayValue === '0') {
      setDisplayValue(num)
    } else if (!atMaxDisplayLength()) {
      setDisplayValue(displayValue + num)
    }
  }

  const clearCalculator = () => {
    setDisplayValue('0')
  }

  const runCurrentOperation = () => {
    if (!currentOperation || !previousValue) {
      return
    }

    let result
    switch (currentOperation) {
      case '+':
        result = previousValue + displayValue
        break;
      case '-':
        result = previousValue - displayValue
        break;
      case '%':
          result = previousValue % displayValue
          break;
      case '*':
          result = previousValue * displayValue
          break;
      case '/':
        result = previousValue / displayValue
      default:
        break;
    }

    setPreviousValue(displayValue)
    setDisplayValue(result)
  }

  const atMaxDisplayLength = () => {
    return displayValue >= MAX_DISPLAY_LENGTH
  }

  const setOperation = (operation) => {
    runCurrentOperation()
    setCurrentOperation(operation)
  }

  const turnOffCalculator = () => {
    setDisplayValue('')
  }
  

  return (
    <div>
      <div className="display"> { displayValue } </div>

      <OffButton powerOff={turnOffCalculator.bind(this)} />
      <ClearButton clear={clearCalculator.bind(this)} />
      <OperandButton operator="%" setOperation={setOperation.bind(this)} />
      <OperandButton operator="/" setOperation={setOperation.bind(this)} />

      <NumberButton addNumber={addNumber.bind(this)} number="7" />
      <NumberButton addNumber={addNumber.bind(this)} number="8" />
      <NumberButton addNumber={addNumber.bind(this)} number="9" />
      <OperandButton operator="x" setOperation={setOperation.bind(this)} />
      
      <NumberButton addNumber={addNumber.bind(this)} number="4" />
      <NumberButton addNumber={addNumber.bind(this)} number="5" />
      <NumberButton addNumber={addNumber.bind(this)} number="6" />
      <OperandButton operator="-" setOperation={setOperation.bind(this)} />
      
      <NumberButton addNumber={addNumber.bind(this)} number="1" />
      <NumberButton addNumber={addNumber.bind(this)} number="2" />
      <NumberButton addNumber={addNumber.bind(this)} number="3" />
      <OperandButton operator="+" setOperation={setOperation.bind(this)} />

      <NumberButton addNumber={addNumber.bind(this)} number="0" />
      <DecimalButton addDecimal={addDecimalPoint.bind(this)} />
      <div onClick={runCurrentOperation()}>=</div>
    </div>
  )
}

export default Calculator