import React, { useState } from 'react'

import './Step_input.scss'



const Increment_input = function(props) {
  const [value, setValue] = useState(props.value || '')
  const increment = (value) => {
    return Number(value) + 1
  }

  return (
    <>
    <div>
      <i className="fa fa-chevron-up" onClick={e=>setValue(prev => Number(prev) + 1)}></i>
      <input
        value={value}
        onChange={e => setValue(e.target.value)}
        name={props.name}
        type={props.type}
      />
      <i className="fa fa-chevron-down" onClick={e=>setValue(prev => Number(prev) - 1)}></i>
    </div>
    </>
  )
}

export default Increment_input