import React, { useState } from 'react'

import './StepInput.scss'

const StepInputClock = function(props: any) {
  const [value, setValue] = useState(new Date(props.value || 0))

  // Get local 24-hr string of state value's timestamp, to display in input
  let timeStr: string = value.toLocaleTimeString([], {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  });

  // Update state with new value directly entered into input
  const handleChange = (inputStr: string) => {
    const timeArr: (string[] | number[]) = inputStr.split(':')
    const [h, m, s] = timeArr
    setValue(prev => {
      const newTime = new Date(prev)
      if (h) newTime.setHours(Number(h))
      if (m) newTime.setMinutes(Number(m))
      if (s) newTime.setSeconds(Number(s))
      return new Date(newTime)
    })
  }

  const handleClick = (sign: number) => {
    setValue(prev => {
      const newTime = new Date(Number(prev) + sign * (60 * 1000))
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
      />
      <i className="fa fa-chevron-down" onClick={e => handleClick(-1)}></i>
    </>
  )
}

export default StepInputClock