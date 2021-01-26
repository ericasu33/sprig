import React, { useState, useEffect } from 'react'
import Button from './Button'

import './StepInput.scss'

const StepInputInt = function(props: any) {
  
  const isPercent = (str: string) => props.percent ? Number(str) * 100 + ' %' : str
  
  const [value, setValue] = useState(isPercent(String(props.value) || '0'))

  const cleanInput = (rawStr: string) => String(rawStr).replace(/\D/g,'')

  useEffect(() => {
    if (Number.isNaN(Number(props.value))) return;
    setValue(isPercent(props.value));
  }, [props.value]);

  const validateVal = (testVal: string | number) => {
    const defaultMin = props.min ? Number(props.min) : 0
    if (Number(testVal) < Number(defaultMin)) {
      return defaultMin
    } else if (Number(testVal) > Number(props.max)) {
      return props.max
    }
    return testVal || props.value
  };

  const handleClick = (plusOrMinus: number, stepSize: (string | number) = props.stepSize || '1') => {
    const cleaned: string = cleanInput(value)
    const rounded = Math.ceil((Number(cleaned) + plusOrMinus * Number(stepSize)) / Number(stepSize)) * Number(stepSize)
    const validated: Number = validateVal(rounded)
    setValue(isPercent(String(validated)))
    props.setValue(props.name, validated);
  };

  const handleBlur = (rawStr: string) => {
    const cleaned: string = cleanInput(rawStr)
    const validated: string = validateVal(cleaned)
    setValue(isPercent(validated))
    props.setValue(props.name, validated);
  };

  return (
    <div className='step-input step-input-int'>
      {props.disabled || <Button increment onClick={(e: any) => handleClick(1)} />}
      <input
        value={value}
        onFocus={e => e.target.select()}
        onChange={e => setValue(e.target.value)}
        onBlur={e => handleBlur(e.target.value)}
        name={props.name}
        type='text'
        disabled={props.disabled}
      />
      {props.disabled || <Button decrement onClick={(e: any) => handleClick(-1)} />}
    </div>
  )
}

export default StepInputInt