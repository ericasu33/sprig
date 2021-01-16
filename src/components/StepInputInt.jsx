import React, { useState } from 'react'

import './StepInput.scss'

const StepInputInt = function(props) {
  const [value, setValue] = useState(props.value || '')

  const validateVal = (testVal) => {
    if (Number(testVal) < Number(props.min)) {
      return props.min
    } else if (Number(testVal) > Number(props.max)) {
      return props.max
    }
    return testVal
  }

  const handleClick = (sign, stepSize = props.stepSize || 1) => {
    const newValue = validateVal(Number(value) + sign * Number(stepSize))
    setValue(newValue)
  }

  const handleBlur = rawStr => {
    let onlyNums = rawStr.replace(/\D/g,'')
    setValue(validateVal(onlyNums))
  }

  return (
    <>
      <i className="fa fa-chevron-up" onClick={e => handleClick(1)}></i>
      <input
        value={value}
        onFocus={e => e.target.select()}
        onChange={e => setValue(e.target.value)}
        onBlur={e => handleBlur(e.target.value)}
        name={props.name}
        type='text'
      />
      <i className="fa fa-chevron-down" onClick={e => handleClick(-1)}></i>
    </>
  )
}

export default StepInputInt