import React, { useState } from 'react'

import './StepInput.scss'


const StepInput = function(props) {
  const [value, setValue] = useState(props.value || '')
  console.log('value:', value)
  
  if (props.type === 'time') {
    const h = props.value.getHours()
    const m = props.value.getMinutes()
    const s = props.value.getSeconds()
    console.log('h:m:s', h, ':', m, ':', s);
    // console.log(props.value);
  }

  const stepValue = (value, sign, stepSize = props.stepSize || 1) => {
    return Number(value) + sign * Number(stepSize)
  }

  return (
    <>
      <i className="fa fa-chevron-up" onClick={e=>setValue(prev => stepValue(prev, 1))}></i>
      <input
        value='18:45'
        onChange={e => setValue(e.target.value)}
        name={props.name}
        type={props.type}
      />
      <i className="fa fa-chevron-down" onClick={e=>setValue(prev => stepValue(prev, -1))}></i>
    </>
  )
}

export default StepInput