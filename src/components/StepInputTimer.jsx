import React, { useState, useEffect } from 'react'

import './StepInput.scss'

const StepInputTimer = function(props) {
  const [value, setValue] = useState(props.value || '00:00:00')
  const [dbTime, setDbTime] = useState(new Date())
  
  const addColons = function (cleanStr) {
    const sixChars = ('000000' + cleanStr).slice(-6)
    let output = ''
    for (let i = 0; i < 6; i += 2) {
      output += i == 2 || i == 4 ? ':' : ''
      let twoChars = sixChars[i] + sixChars[i + 1]
      output += twoChars
    }
    return output
  }
  
  const updateByStepValue = function (prev, sign) {
    let [h, m, s] = prev.split(':')
    m = Number(m) + Number(sign)
    h = Number(h)
    if (m < 0) {
      if (h !== 0) {
        h -= 1
        m = 59
      } else {
        m = 0
      }
    }
    if (m > 59) {
      h += 1
      m = m % 60
    }    
    let ss = ("0" + s).slice(-2);
    let mm = ("0" + m).slice(-2);
    let hh = ("0" + h).slice(-2);
    return `${hh}:${mm}:${ss}`
  }

  const reformatInputStr = function (rawStr) {
    const cleanStr = rawStr.split(':').join('')
    return addColons(cleanStr)
  }

  return (
    <>
      <i className="fa fa-chevron-up" onClick={e=>setValue(prev => updateByStepValue(prev, 1))}></i>
      <input
        value={value}
        onFocus={e => e.target.select()}
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