import React, { useState, useEffect } from 'react'
import Button from './Button'

import './StepInput.scss'

const StepInputClock = function(props: any) {
  const [inputVal, setInputVal] = useState(new Date(props.time))

  // Get local 24-hr string of state value's timestamp, to display in input
  let timeStr: string = inputVal.toLocaleTimeString(['en-GB'], {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  });

  // Set start_time (as props from Stopwatch component) on any 'inputVal' update
  useEffect(() => {
    props.onChange(props.name, inputVal)
  }, [inputVal])

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
    setInputVal(prev => {
      const newTime = new Date(props.time)
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
    setInputVal((prev: Date) => {
      const newTime = new Date(Number(props.time) + sign * (60 * 1000))
      if (isAllowed(newTime)) {
        return newTime
      }
      return prev
    })
  }

  return (
    <div className='step-input step-input-clock'>
      {props.disabled || <Button increment onClick={(e: any) => handleClick(1)} />}
      <input
        value={timeStr}
        onChange={e => handleChange(e.target.value)}
        name={props.name}
        type='time'
        disabled={props.disabled}
      />
      {props.disabled || <Button decrement onClick={(e: any) => handleClick(-1)} />}
    </div>
  )
}

export default StepInputClock