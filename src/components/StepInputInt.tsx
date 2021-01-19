import React, { useState } from 'react'
import ButtonStepInput from './ButtonStepInput'

import './StepInput.scss'

const StepInputInt = function(props: any) {
  
  const concatPercent = (str: string) => str + (props.percent ? ' %' : '')
  
  const [value, setValue] = useState(concatPercent(String(props.value) || '0'))

  const cleanInput = (rawStr: string) => String(rawStr).replace(/\D/g,'')

  const validateVal = (testVal: string | number) => {
    const defaultMinZero = props.min ? Number(props.min) : 0

    if (Number(testVal) < Number(defaultMinZero)) {
      return defaultMinZero
    } else if (Number(testVal) > Number(props.max)) {
      return props.max
    }
    return testVal
  }

  const handleClick = (plusOrMinus: number, stepSize: (string | number) = props.stepSize || '1') => {
    const cleaned: string = cleanInput(value)
    const rounded = Math.ceil(
      (Number(cleaned) + plusOrMinus * Number(stepSize)) / Number(stepSize)
    ) * Number(stepSize)

    const validated: Number = validateVal(rounded)
    setValue(concatPercent(String(validated)))
  }

  const handleBlur = (rawStr: string) => {
    const cleaned: string = cleanInput(rawStr)
    const validated: string = validateVal(cleaned)
    setValue(concatPercent(validated))
  }

  return (
    <div className='step-input step-input-int'>
      <label>{props.name}</label>
      <br />
      {!props.disabled && <ButtonStepInput plus onClick={handleClick}/>}
      <input
        value={value}
        onFocus={e => e.target.select()}
        onChange={e => setValue(e.target.value)}
        onBlur={e => handleBlur(e.target.value)}
        name={props.name}
        type='text'
        disabled={props.disabled}
      />
      {!props.disabled && <ButtonStepInput minus onClick={handleClick}/>}
    </div>
  )
}

export default StepInputInt