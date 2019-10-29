import React, { useRef, useState, useEffect } from 'react';


import NumberButton from './NumberButton';
import OffButton from './OffButton';
import DecimalButton from './DecimalButton';
import OperandButton from './OperandButton';

import './Calculator.scss';

const MAX_DISPLAY_LENGTH = 10

function Calculator () {
  const [displayValue, setDisplayValue] = useState('')
  const [previousValue, setPreviousValue] = useState('')
  const [currentOperation, setCurrentOperation] = useState('')
  // const [previousOperation, setPreviousOperation] = useState('')
  const [pressedBtn, setPressedBtn] = useState('')
  const displayInputRef = useRef(null)


  useEffect(() => {
    console.log('displayInputRef: ', displayInputRef)
    if (displayInputRef.current) {
      displayInputRef.current.focus()
    }
  })

  const addDecimalPoint = () => {
    if (!displayValue.includes('.') && atMaxDisplayLength()) {
      setDisplayValue(displayValue + '.')
    }
  }

  const addNumber = (num) => {
    console.log('the num: ', num)
    if (displayValue === '0') {
      setDisplayValue(num)
    } else {
      setDisplayValue(displayValue + num)
    }
  }

  const clearCalculator = () => {
    setCurrentOperation('')
    setDisplayValue('0')
  }

  const handleTextChange = (val) => {
    console.log('hello')
    console.log('val: ', val)
    addNumber(val)
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
          result = previousValue * (0.01) * displayValue
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
    return displayValue.length >= MAX_DISPLAY_LENGTH
  }

  const setOperation = (operation) => {
    if (currentOperation) {
      runCurrentOperation()
    }
    setCurrentOperation(operation)
  }

  const turnOffCalculator = () => {
    setDisplayValue('')
  }
  


  return (
    <div className="calculator">
      <input
        type="text"
        className="display"
        onChange={(e) => { handleTextChange(e.target.value)} }
        value={displayValue}
        ref={displayInputRef}
      />

      <div className="btn-wrap">
        <OffButton customClass="grid-1" powerOff={turnOffCalculator.bind(this)} />
        <div
          className={`btn clear grid-2 ${pressedBtn === 'clear' ? 'pressed' : ''}`}
          onClick={() => { clearCalculator()} }
          onMouseDown={() => { setPressedBtn('clear')} }
          onMouseUp={() => { setPressedBtn('')} }
          >
            C
        </div>
        <OperandButton customClass="grid-3" operator="%" setOperation={() => { setOperation.bind(this)} } />
        <OperandButton customClass="grid-4" operator="/" setOperation={() => { setOperation.bind(this)} } />

        <NumberButton customClass="grid-5" addNumber={addNumber.bind(this)} number="7" />
        <NumberButton customClass="grid-6" addNumber={addNumber.bind(this)} number="8" />
        <NumberButton customClass="grid-7" addNumber={addNumber.bind(this)} number="9" />
        <OperandButton customClass="grid-8" operator="x" setOperation={() => { setOperation.bind(this)} } />
        
        <NumberButton customClass="grid-9" addNumber={addNumber.bind(this)} number="4" />
        <NumberButton customClass="grid-10" addNumber={addNumber.bind(this)} number="5" />
        <NumberButton customClass="grid-11" addNumber={addNumber.bind(this)} number="6" />
        <OperandButton customClass="grid-12" operator="-" setOperation={() => { setOperation.bind(this)} } />
        
        <NumberButton customClass="grid-13" addNumber={addNumber.bind(this)} number="1" />
        <NumberButton customClass="grid-14" addNumber={addNumber.bind(this)} number="2" />
        <NumberButton customClass="grid-15" addNumber={addNumber.bind(this)} number="3" />
        <OperandButton customClass="grid-16" operator="+" setOperation={() => { setOperation.bind(this)} } />

        <NumberButton customClass="grid-17" addNumber={addNumber.bind(this)} number="0" />
        <DecimalButton customClass="grid-18" addDecimal={() => { addDecimalPoint.bind(this)} } />
        <div
          className={`btn bottom-row equals grid-19 ${pressedBtn === 'equals' ? 'pressed' : ''}`}
          onClick={() => { runCurrentOperation()} }
          onMouseDown={() => {setPressedBtn('equals')}}
          onMouseUp={() => {setPressedBtn('')}}
          >
            =
          </div>
      </div>
      
    </div>
  )
}

export default Calculator