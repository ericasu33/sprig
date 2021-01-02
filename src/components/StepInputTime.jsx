import React, { useState } from 'react'

import './StepInput.scss'

/* TODO:
  * Conditionally render the chevrons
  * Make this component universal? Or make one component for integers, one for clocks/timers
  * Distinguish between clock time and timer time: UTC or not?
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
    // TODO: extract hours:minutes:seconds from display time based on props.display
    const displayKeys = Object.keys(props.display)
    console.log('...displayKeys:', ...displayKeys);
    const [h, m, s] = inputStr.split(':')
    console.log('h:m:s', h, ':', m, ':', s);
    
    setValue(prev => {
      const newTime = new Date(prev)
      if (h) newTime.setHours(h)
      if (m) newTime.setMinutes(m)
      if (s) newTime.setSeconds(s)
      return newTime
    })
  }

  const updateByStepValue = function (sign, stepSize = props.stepSize || '1:00') {
    const [m, s] = stepSize.split(':')
    // console.log('m:s', ':', m, ':', s);

    // const stepSizeMillis = m * 60 * 1000 + s * 1000
    return setValue(prev => {
      const newTime = new Date(prev)
      // console.log('prev.getMinutes:', prev.getMinutes());
      // console.log('prev.getSeconds:', prev.getSeconds());
      newTime.setMinutes(prev.getMinutes() + m * sign)
      newTime.setSeconds(prev.getSeconds() + s * sign)
      // const newTime = newTime
      console.log(newTime);

      return newTime
    })
    // return new Date(Number(value) + sign * Number(stepSizeMillis))
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
      />
      <i className="fa fa-chevron-down" onClick={e => updateByStepValue(-1)}></i>
    </>
  )
}

export default StepInputTime