import React, { useState } from 'react'

import './Step_input.scss'



const Increment_input = function() {
  const [value, setValue] = useState('')

  return (
    <>
    <div>
      <i className="fa fa-chevron-up" onClick={e=>setValue((prev)=>prev + 1)}></i>
      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        name='input'
        type='time'
        step='60'
      />
      <i className="fa fa-chevron-down" ></i>
    </div>
    <br />
    <div>
      <i className="fa fa-chevron-up" ></i>
      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        name='input'
        type='time'
        step='60'
      />
      <i className="fa fa-chevron-down" ></i>
    </div>
    </>
  )
}

export default Increment_input