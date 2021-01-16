import React, { useState } from 'react'

import './StepInput.scss'

const StepInputClock = function(props) {
  const [value, setValue] = useState(new Date(props.value || 0))

  // Get local 24-hr string of state value's timestamp, to display in input
  let timeStr = value.toLocaleTimeString([], {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  });

  // Update state with new value directly entered into input
  const handleChange = function(inputStr) {
    const [h, m, s] = inputStr.split(':')
    setValue(prev => {
      const newTime = new Date(prev)
      if (h) newTime.setHours(h)
      if (m) newTime.setMinutes(m)
      if (s) newTime.setSeconds(s)
      return new Date(newTime)
    })
  }

  const handleClick = function (sign, stepSize = props.stepSize || '1:00') {
    const [m, s] = stepSize.split(':')
    setValue(prev => {
      const newTime = new Date(Number(prev) + sign * (m * 60 * 1000 + s * 1000))
      console.log(newTime);
      return newTime
    })
  }

  return (
    <>
      <i className="fa fa-chevron-up" onClick={e => handleClick(1)}></i>
      <input
        value={timeStr}
        onChange={e => handleChange(e.target.value)}
        name={props.name}
        type='time'
        // step={props.format === 'clock' ? 60 : 1}
      />
      <i className="fa fa-chevron-down" onClick={e => handleClick(-1)}></i>
    </>
  )
}

export default StepInputClock