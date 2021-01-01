import React, { useState } from 'react'

import './StepInput.scss'

/* TODO:
  * Conditionally render the chevrons
  * Make this component universal? Or make one component for integers, one for clocks/timers
*/

const StepInputTime = function(props) {


  const [value, setValue] = useState(new Date(props.value))
  console.log('value:', value)
  
  // const time = new Date(props.value)
  
  const h = value.getHours()
  const m = value.getMinutes()
  // value.setMinutes(m + 5)
  const s = value.getSeconds()
  console.log('h:m:s', h, ':', m, ':', s);
  console.log('`${h}:${m}`', `${h}:${m}`);
  
  const timeStr = value.toLocaleTimeString(['en-GB']);
  console.log('timeStr:', timeStr);

  const stepValue = (value, sign, stepSize = props.stepSize || 1000 * 60) => {
    return new Date(Number(value) + sign * Number(stepSize))
  }

  return (
    <>
      <i className="fa fa-chevron-up" onClick={e=>setValue(prev => stepValue(prev, 1))}></i>
      <input
        // value={`${h}:${m}`}
        value={timeStr}
        // onChange={e => setValue(e.target.value)}
        onChange={e => console.log(e.target.value)}
        name={props.name}
        type='time'
      />
      <i className="fa fa-chevron-down" onClick={e=>setValue(prev => stepValue(prev, -1))}></i>
    </>
  )
}

export default StepInputTime