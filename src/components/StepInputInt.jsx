import React, { useState } from 'react'

import './StepInput.scss'

/* TODO:
  * Conditionally render the chevrons
  * Implement min/max limits on input
*/

const StepInputInt = function(props) {
  const [value, setValue] = useState(props.value || '')

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

export default StepInputInt