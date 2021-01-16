import React, { useState } from 'react'

import './StepInput.scss'

const StepInputClock = function(props: any) {
  const [time, setTime] = useState(new Date(props.value || 0))

  // Get local 24-hr string of state value's timestamp, to display in input
  let timeStr: string = time.toLocaleTimeString([], {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  });

  // Check if 'time' arg is in the past, return bool
  const isAllowed = (time: Date): boolean => {
    if (props.allowFuture === 'true') {
      return true
    }
    return time <= new Date()
  }

  // Update state with new value directly entered into input
  const handleChange = (inputStr: string) => {
    const timeArr: (string[] | number[]) = inputStr.split(':')
    const [h, m, s] = timeArr
    setTime(prev => {
      const newTime = new Date(prev)
      if (h) newTime.setHours(Number(h))
      if (m) newTime.setMinutes(Number(m))
      if (s) newTime.setSeconds(Number(s))
      if (isAllowed(newTime)) {
        return newTime
      }
      return prev
    })
  }

  // Update state +/- 1min from buttons clicked
  const handleClick = (sign: number) => {
    setTime((prev: Date) => {
      const newTime = new Date(Number(prev) + sign * (60 * 1000))
      if (isAllowed(newTime)) {
        return newTime
      }
      return prev
    })
  }

  return (
    <>
      <i className="fa fa-plus-square" onClick={e => handleClick(1)}></i>
      <input
        value={timeStr}
        onChange={e => handleChange(e.target.value)}
        name={props.name}
        type='time'
      />
      <i className="fa fa-minus-square" onClick={e => handleClick(-1)}></i>
    </>
  )
}

export default StepInputClock