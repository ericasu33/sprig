import React, { useEffect, useState } from 'react'

import './StepInput.scss'

const StepInputInt = function(props: any) {
  const [value, setValue] = useState(props.value || '0')

  useEffect(() => {
    if (Number.isNaN(Number(props.value))) return;
    setValue(props.value);
  }, [props.value]);

  const validateVal = (testVal: string | number) => {
    if (Number(testVal) < Number(props.min)) {
      return props.min
    } else if (Number(testVal) > Number(props.max)) {
      return props.max
    }
    return testVal
  }

  const handleClick = (sign: number, stepSize: (string | number) = props.stepSize || '1') => {
    const newValue: Number = validateVal(Number(value) + sign * Number(stepSize));
    setValue(newValue);
    props.setValue(newValue);
  }

  const handleBlur = (rawStr: string) => {
    const onlyNums: string = rawStr.replace(/\D/g,'');
    const num = validateVal(onlyNums);
    setValue(num || props.value);
    props.setValue(num || props.value);
  };

  const handleChange = (rawStr: string) => {
    setValue(rawStr);
  };

  return (
    <>
      { props.disabled || <i className="fa fa-plus-square" onClick={e => handleClick(1)}></i>}
      <input
        value={value}
        onFocus={e => e.target.select()}
        onChange={e => handleChange(e.target.value)}
        onBlur={e => handleBlur(e.target.value)}
        name={props.name}
        type='text'
        disabled={props.disabled}
      />
      { props.disabled || <i className="fa fa-minus-square" onClick={e => handleClick(-1)}></i>}
    </>
  )
}

export default StepInputInt