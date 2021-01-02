import React, { useState, useEffect } from 'react'

import './StepInput.scss'

/* TODO:
  * Conditionally render the chevrons
  * Make this component universal? Or make one component for integers, one for clocks/timers
  * Distinguish between clock time and timer time: UTC or not?
  * 
  * BIG CHALLENGE: 
  *   if we format the box as time, it'll display with AM/PM, which doesn't make sense for timers
  *   if we format the box as text, we have to store the state value as literally the string being displayed, otherwise each attempt to manually alter the input re-renders, re-calculates the new timestamp and essentially prevents manual user changes to the time.
  * I think we should use time for clock-times, because it's cool BUT current code tries to set the time as 24:05 instead of 00:05, so that's not good. Then use text for timer times and store the value in state but convert it to seconds before sending to the DB
*/

const StepInputClock = function(props) {
  const [value, setValue] = useState(new Date(props.value || 0))
  console.log('value:', value)

  // Get local 24-hr string of state value's timestamp, to display in input
  let timeStr = value.toLocaleTimeString([], {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  });
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
        type='time'
        step={props.format === 'clock' ? 60 : 1}
      />
      <i className="fa fa-chevron-down" onClick={e => updateByStepValue(-1)}></i>
    </>
  )
}

export default StepInputClock