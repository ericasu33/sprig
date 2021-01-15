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

const StepInputTimer = function(props) {
  const [value, setValue] = useState(props.value || '00:00:00')
  const [dbTime, setDbTime] = useState(new Date())
  console.log('value:', value);

  const updateByStepValue = function (prev, sign, stepSize = props.stepSize || '1:00') {
    const prevArr = prev.split(':')
    const updatedArr = prevArr.map((el, i) => {
      if (i === 1) {
        return ('0' + (Number(el) + 1 * Number(sign))).slice(-2)
      }
      return el
    })
    return updatedArr.join(':')
  }

  const removeColons = function (rawStr) {
    return rawStr.split(':').join('')
  }

  const reformatInputStr = function (rawStr) {
    const blandStr = rawStr.split(':').join('')
    const sixChars = ('000000' + blandStr).slice(-6)
    let output = ''
    for (let i = 0; i < 6; i += 2) {
      output += i == 2 || i == 4 ? ':' : ''
      let twoChars = sixChars[i] + sixChars[i + 1]
      output += twoChars
    }
    return output
  }

  const handleFocus = function (e) {
    // setValue(removeColons(e.target.value))
    e.target.select()
  }

  return (
    <>
      <i className="fa fa-chevron-up" onClick={e=>setValue(prev => updateByStepValue(prev, 1))}></i>
      <input
        value={value}
        onFocus={e => handleFocus(e)}
        onChange={e => setValue(e.target.value)}
        onBlur={e => setValue(reformatInputStr(e.target.value))}
        name={props.name}
        type='text'
        step={props.format === 'clock' ? 60 : 1}
      />
      <i className="fa fa-chevron-down" onClick={e=>setValue(prev => updateByStepValue(prev, -1))}></i>
    </>
  )
}

export default StepInputTimer