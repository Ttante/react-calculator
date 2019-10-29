import React, { useRef, useState, useEffect } from 'react';

import NumberFormat from 'react-number-format';

import { evaluate } from 'mathjs'

import NumberButton from './NumberButton';
import OffButton from './OffButton';
import DecimalButton from './DecimalButton';
import OperandButton from './OperandButton';

import './Calculator.scss';

const MAX_DISPLAY_LENGTH = 10

function Calculator () {
  const [displayValue, setDisplayValue] = useState('')
  const [previousValue, setPreviousValue] = useState('')
  const [currentOperation, setCurrentOperation] = useState(null)
  // const [previousOperation, setPreviousOperation] = useState('')
  const [pressedBtn, setPressedBtn] = useState('')
  let displayInputRef = useRef(null)
  const [expression, setExpression] = useState('')
  const [initialValue, setInitialValue] = useState('0')


  useEffect(() => {
    console.log('displayInputRef: ', displayInputRef)
    if (displayInputRef.current) {
      displayInputRef.current.focus()
    }
  })

  const addDecimalPoint = () => {
    const test = parseFloat(displayValue) - parseInt(displayValue)
    console.log('test: ', test)
    if (!displayValue || (parseFloat(displayValue) - parseInt(displayValue)) === 0) {
      if (null === currentOperation) {
        setExpression('')
        setInitialValue(0)
      }
      console.log('wtf', (displayValue || '0') + '.')
      setDisplayValue((displayValue || '0') + '.')
      if (!displayValue) {
        setInitialValue('0.')
      }
    }    
  }

  const addNumber = (num) => {
    // console.log('the num: ', num, currentOperation)
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
    setDisplayValue('')
    setInitialValue('0')
    setExpression('')
  }

  const handleEquals = () => {

    const intermediateExpression = expression + displayValue  
    setCurrentOperation(null)
    // console.log('intermediateExpression: ', intermediateExpression)
    
    try {
      let result = evaluate(intermediateExpression)
      if (!Number.isFinite(result) || Number.isNaN(result)) {
        result = 0
      }
      console.log(result)
      console.log('result.length: ', result.length)
      setInitialValue(result.toPrecision(6))
      setExpression(result)
      setDisplayValue('')
    } catch (err) {
      // setDisplayValue(displayValue)
    }

  }

  const handleTextChange = (val) => {
    const allowedValues = /[0-9|+|-|*|/|%|.]+/g
    console.log('hello')
    console.log('val: ', val)
    if (val && !allowedValues.test(val)) {
      return null
    }

    console.log('currOperation: ', currentOperation)

    if (null === currentOperation) {
      setExpression('')
    }
    setDisplayValue(val)
    setCurrentOperation(null)
  }



  const atMaxDisplayLength = () => {
    return displayValue.length >= MAX_DISPLAY_LENGTH
  }

  // console.log('displayValue: ', displayValue)
  let initStr = initialValue.toString()
  console.log('initStr.length: ', initStr.length)

  const trimResult = (result) => {
    let trimmedResult = result.toString()
    
    return trimmedResult
  }

  const setOperation = (operation) => {
    console.log('currentOperation: ', currentOperation)

    if ('%' === operation) {
      operation = '*0.01*'
    }
    
    setCurrentOperation(operation)
    
    let intermediateExpression = expression + displayValue
    console.log('intermediateExpression: ', intermediateExpression)
    
    try {
      let result = evaluate(intermediateExpression)
      if (!Number.isFinite(result) || Number.isNaN(result)) {
        result = 0
      }
      console.log('initial value', result)
      setInitialValue(trimResult(result))
    } catch (err) {
      console.log(err)
      // setDisplayValue(displayValue)
    }
    
    setExpression(intermediateExpression + operation)
 

    setDisplayValue('')

    

  }


  const turnOffCalculator = () => {
    setDisplayValue('')
  }



  return (
    <div className="calculator">
      <NumberFormat
        thousandSeparator={true}
        type="text"
        displayType="input"
        className="display"
        onChange={(e) => { handleTextChange(e.target.value) } }
        value={displayValue}
        getInputRef={(el) => { displayInputRef = el }}
        placeholder={initialValue}
      />

      <div className="btn-wrap">
        <OffButton customClass="grid-1 off" powerOff={turnOffCalculator.bind(this)} />
        <div
          className={`btn clear grid-2 ${pressedBtn === 'clear' ? 'pressed' : ''}`}
          onClick={() => { clearCalculator()} }
          onMouseDown={() => { setPressedBtn('clear')} }
          onMouseUp={() => { setPressedBtn('')} }
          >
            C
        </div>
        <OperandButton customClass="grid-3 percent" operator="%" setOperation={setOperation.bind(this)} />
        <OperandButton customClass="grid-4 divide" operator="/" setOperation={setOperation.bind(this)} />

        <NumberButton customClass="grid-5" addNumber={addNumber.bind(this)} number="7" />
        <NumberButton customClass="grid-6" addNumber={addNumber.bind(this)} number="8" />
        <NumberButton customClass="grid-7" addNumber={addNumber.bind(this)} number="9" />
        <OperandButton customClass="grid-8 multiply" operator="*" setOperation={setOperation.bind(this)} />
        
        <NumberButton customClass="grid-9" addNumber={addNumber.bind(this)} number="4" />
        <NumberButton customClass="grid-10" addNumber={addNumber.bind(this)} number="5" />
        <NumberButton customClass="grid-11" addNumber={addNumber.bind(this)} number="6" />
        <OperandButton customClass="grid-12 minus" operator="-" setOperation={setOperation.bind(this)} />
        
        <NumberButton customClass="grid-13" addNumber={addNumber.bind(this)} number="1" />
        <NumberButton customClass="grid-14" addNumber={addNumber.bind(this)} number="2" />
        <NumberButton customClass="grid-15" addNumber={addNumber.bind(this)} number="3" />
        <OperandButton customClass="grid-16 plus" operator="+" setOperation={setOperation} />

        <NumberButton customClass="grid-17" addNumber={addNumber.bind(this)} number="0" />
        <DecimalButton customClass="grid-18" addDecimal={addDecimalPoint} />
        <div
          className={`btn bottom-row equals grid-19 ${pressedBtn === 'equals' ? 'pressed' : ''}`}
          onClick={() => { handleEquals() } }
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