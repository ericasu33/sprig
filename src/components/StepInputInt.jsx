import React, { useState } from 'react'

import './StepInput.scss'

/* TODO:
  * Conditionally render the chevrons
  * Make this component universal? Or make one component for integers, one for clocks/timers
*/

const StepInput = function(props) {
  const [value, setValue] = useState(props.value || '')
  console.log('value:', value)
  
  if (props.format === 'time') {
    const h = props.value.getHours()
    const m = props.value.getMinutes()
    const s = props.value.getSeconds()
    console.log('h:m:s', h, ':', m, ':', s);

    let formatted;
    // Render string format
    switch (props.subformat) {
      case ('hh:mm:ss'):
        formatted=`${h}:${m}:${s}`;
        break;
      case ('hh:mm'):
        formatted=`${h}:${m}`;
        break;
      case ('mm:ss'):
        formatted=`${m}:${s}`;
    }
    console.log('----format:', formatted);

    // Set state on every render
    setValue(prev => formatted)
    // console.log(props.value);
  }

  const stepValue = (value, sign, stepSize = props.stepSize || 1) => {
    return Number(value) + sign * Number(stepSize)
  }

  return (
    <>
      <i className="fa fa-chevron-up" onClick={e=>setValue(prev => stepValue(prev, 1))}></i>
      <input
        value={value}
        onChange={e => setValue(e.target.value)}
        name={props.name}
        type='text'
      />
      <i className="fa fa-chevron-down" onClick={e=>setValue(prev => stepValue(prev, -1))}></i>
    </>
  )
}

export default StepInput