import React, { useState } from 'react'

import './StepInput.scss'

/* TODO:
  * Conditionally render the chevrons
  * Make this component universal? Or make one component for integers, one for clocks/timers
*/

const StepInputTime = function(props) {
  const [value, setValue] = useState(new Date(props.value || 0))
  // console.log('value:', value)
  
  const timeStr = value.toLocaleTimeString([], {
    hour12: false,
    ...props.display
  });
  console.log('timeStr:', timeStr);

  const updateFromInputStr = function(inputStr) {
    const [h, m, s] = inputStr.split(':')
    console.log('h:m:s', h, ':', m, ':', s);
    setValue(prev => {
      const newTime = prev
      if (h) prev.setHours = h
      if (m) prev.setMinutes = m
      if (s) prev.setSeconds = s
      return newTime
    })
  }

  const stepValue = function (value, sign, stepSize = props.stepSize || '1:00') {
    const [m, s] = stepSize.split(':')
    const stepSizeMillis = m * 60 * 1000 + s * 1000
    return new Date(Number(value) + sign * Number(stepSizeMillis))
  }

  return (
    <>
      <i className="fa fa-chevron-up" onClick={e => setValue(prev => stepValue(prev, 1))}></i>
      <input
        // value={`${h}:${m}`}
        value={timeStr}
        // onChange={e => setValue(e.target.value)}
        onChange={e => updateFromInputStr(e.target.value)}
        // onChange={e => console.log('--- input value is:', typeof e.target.value)}
        name={props.name}
        type='text'
      />
      <i className="fa fa-chevron-down" onClick={e => setValue(prev => stepValue(prev, -1))}></i>
    </>
  )
}

export default StepInputTime