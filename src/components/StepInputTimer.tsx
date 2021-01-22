import React, { useState, useEffect } from 'react'
import ButtonStepInput from './ButtonStepInput'

import './StepInput.scss'

// Validity check for user's raw input
const isAllNumbers = (noColons: string): boolean => {
  return /^\d+$/.test(noColons);
}

const timeStrToSec = (timeStr: string) => {
  const maxTime = 60 * 60 * 24;
  let noColons = timeStr.split(':').join("");
  if (!isAllNumbers(noColons)) return null;
  const ss = noColons.slice(-2);
  const mm = noColons.slice(-4,-2);
  const hh = noColons.slice(-6,-4);
  let totalSeconds = Number(hh) * 60 * 60 + Number(mm) * 60 + Number(ss);
  if (totalSeconds >= maxTime) totalSeconds = maxTime - 1;
  return totalSeconds;
};

const secToTimeStr = (sec: number) => {
  let acc = Math.floor(sec / 60);
  const ss = sec % 60;
  const mm = acc % 60;
  acc = Math.floor(acc / 60);
  const hh = acc % 24;
  return `${hh < 10 ? `0${hh}` : hh}:${mm < 10 ? `0${mm}` : mm}:${ss < 10 ? `0${ss}` : ss}`;
};

const StepInputTimer = function(props: any) {

  const [time, setTime] = useState(secToTimeStr(props.value));

  useEffect(() => {
    if (Number.isNaN(Number(props.value))) return;
    setTime(secToTimeStr(props.value));
  }, [props.value]);
  // Adjust time with butttons
  const handleClick = (direction: number): void => {
    const newSec = props.value + direction;
    if (newSec < 0) return;
    setTime(secToTimeStr(newSec));
    props.setValue(props.name, newSec);
  }

  // Adjust time by manually entering a new time
  const handleBlur = (rawStr: string) => {
    const sec = timeStrToSec(rawStr);
    if (sec === null) return setTime(secToTimeStr(props.value));
    setTime(secToTimeStr(sec));
    props.setValue(props.name, sec);
  };

  return (
    <div className='step-input step-input-timer'>
      {props.disabled || <ButtonStepInput plus onClick={handleClick}/>}
      <input
        value={time}
        onFocus={e => e.target.select()}
        onChange={e => setTime(e.target.value)}
        onBlur={e => handleBlur(e.target.value)}
        name={props.name}
        type='text'
        step={props.format === 'clock' ? 60 : 1}
        disabled={props.disabled}
      />
      {props.disabled || <ButtonStepInput minus onClick={handleClick}/>}
    </div>
  )
}

export default StepInputTimer