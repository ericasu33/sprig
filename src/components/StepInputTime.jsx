import React, { useState, useEffect } from 'react'

import './StepInput.scss'

/* TODO:
  * Conditionally render the chevrons
  * Make this component universal? Or make one component for integers, one for clocks/timers
  * Distinguish between clock time and timer time: UTC or not?
*/

const StepInputTime = function(props) {
  const [value, setValue] = useState(new Date(props.value || 0))
  console.log('value:', value);
  
  // useEffect(() => {
  //   if (props.format === 'timer') {
  //     setValue(prev => new Date(Number(prev) - (prev.getHours() * 60 * 60 * 1000)))
  //   }
  // }, [])

  console.log('value.getHours():', value.getHours());

  // Set display format for 'timer' = 'HH:mm:ss' or 'clock' = 'HH:mm'
  const displayFormat = {hour: '2-digit', minute: '2-digit'}
  if (props.format === 'timer') displayFormat.seconds = '2-digit'

  console.log(displayFormat);

  // Get local 24-hr string of state timestamp, to display in input
  let timeStr = value.toLocaleTimeString([], {hour12: false, ...displayFormat});
  console.log('timeStr:', timeStr);

  // Update state with new value directly entered into input
  const updateFromInputStr = function(inputStr) {
    console.log('inputStr:', inputStr);
    const [h, m, s] = inputStr.split(':')    
    setValue(prev => {
      const newTime = new Date(prev)
      if (h) newTime.setHours(h)
      if (m) newTime.setMinutes(m)
      if (s) newTime.setSeconds(s)
      return new Date(newTime)
    })
  }

  const updateByStepValue = function (sign, stepSize = props.stepSize || '1:00') {
    const [m, s] = stepSize.split(':')
    setValue(prev => {
      const newTime = new Date(Number(prev) + sign * (m * 60 * 1000 + s * 1000))
      console.log(newTime);
      return newTime
    })
  }

  return (
    <>
      <i className="fa fa-chevron-up" onClick={e => updateByStepValue(1)}></i>
      <input
        value={timeStr}
        onChange={e => updateFromInputStr(e.target.value)}
        // onChange={e => console.log('--- input value is:', e.target.value)}
        name={props.name}
        type='text'
        step={props.format === 'clock' ? 60 : 1}
      />
      <i className="fa fa-chevron-down" onClick={e => updateByStepValue(-1)}></i>
    </>
  )
}

export default StepInputTime