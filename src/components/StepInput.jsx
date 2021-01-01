import React, { useState } from 'react'

import './StepInput.scss'


const StepInput = function(props) {
  const [value, setValue] = useState(props.value || '')

  const stepValue = (value, sign, stepSize = props.stepSize || 1) => {
    return Number(value) + sign * Number(stepSize)
  }

  return (
    <>
    <div>
      <i className="fa fa-chevron-up" onClick={e=>setValue(prev => stepValue(prev, 1))}></i>
      <input
        value={value}
        onChange={e => setValue(e.target.value)}
        name={props.name}
        type={props.type}
        min={0}
        max={100}
      />
      <i className="fa fa-chevron-down" onClick={e=>setValue(prev => stepValue(prev, -1))}></i>
    </div>
    </>
  )
}

export default StepInput