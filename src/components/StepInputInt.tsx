import React, { useState } from 'react'

import './StepInput.scss'

const StepInputInt = function(props: any) {
  const [value, setValue] = useState(props.value || '0')

  const validateVal = (testVal: string | number) => {
    if (Number(testVal) < Number(props.min)) {
      return props.min
    } else if (Number(testVal) > Number(props.max)) {
      return props.max
    }
    return testVal
  }

  const handleClick = (sign: number, stepSize: (string | number) = props.stepSize || '1') => {
    const newValRounded = Math.ceil((Number(value) + sign * Number(stepSize)) / Number(stepSize)) * Number(stepSize)
    const newValValid: Number = validateVal(newValRounded)
    setValue(newValValid)
  }

  const handleBlur = (rawStr: string) => {
    const onlyNums: string = rawStr.replace(/\D/g,'')
    setValue(validateVal(onlyNums))
  }

  return (
    <>
      <i className="fa fa-plus-square" onClick={e => handleClick(1)}></i>
      <input
        value={value}
        onFocus={e => e.target.select()}
        onChange={e => setValue(e.target.value)}
        onBlur={e => handleBlur(e.target.value)}
        name={props.name}
        type='text'
        disabled={props.disabled}
      />
      <i className="fa fa-minus-square" onClick={e => handleClick(-1)}></i>
    </>
  )
}

export default StepInputInt