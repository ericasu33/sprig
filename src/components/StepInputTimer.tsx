import React, { useState } from 'react'

import './StepInput.scss'

// Time array --> Date object
const convertTimeArrToDateObj = (timeArr: string[] | number[]) => {
  const [h, m, s] = timeArr
  const seconds = Number(h) * 60 * 60 + Number(m) * 60 + Number (s)
  return new Date(seconds * 1000)
}
// Date object --> Time array
const convertDateObjToArr = (dateObj: Date) => {
  let s: number = dateObj.getUTCSeconds()
  let m: number = dateObj.getUTCMinutes()
  let h: number = dateObj.getUTCHours()
  return [h, m, s]
}

// Time array --> Time string
const convertTimeArrToStr = ([h, m, s]: (number[])) => {
  let ss = ("0" + s).slice(-2);
  let mm = ("0" + m).slice(-2);
  let hh = ("0" + h).slice(-2);
  const timeStr = `${hh}:${mm}:${ss}`
  return timeStr
}
// Time string --> Time array
const convertTimeStrToArr = (rawStr: string | number) => {
  // Let h, m, s from rawStr
  let s: number = Math.floor(Number(rawStr) % 100)
  let m: number = Math.floor((Number(rawStr) / 100) % 100)
  let h: number = Math.floor((Number(rawStr) / 100 / 100) % 100)
  return [h, m, s]
}

// Validity check for user's raw input
const isAllNumbers = (noColons: string): boolean => {
  return /^\d+$/.test(noColons)
}

const secToTimeStr = (sec: number) => {
  const ss = sec % 60;
  const mm = ((sec - ss) / 60) % 60;
  const hh = ((((sec - ss) / 60) - mm) / 60) % 24;
  return `${hh < 10 ? `0${hh}` : hh}:${mm < 10 ? `0${mm}` : mm}:${ss < 10 ? `0${ss}` : ss}`;
};

const StepInputTimer = function(props: any) {

  const [time, setTime] = useState(secToTimeStr(props.value));

  // Adjust time with butttons
  const handleClick = (direction: number): void => {
    let dateObj: (Date | number) = convertTimeArrToDateObj(`${time}`.split(':'))
    dateObj.setUTCMinutes(dateObj.getUTCMinutes() + direction)

    // Disallow wrapping from 00:00:00 to 23:59:00
    if (Number(dateObj) < 0) return

    const timeArr: number[] = convertDateObjToArr(dateObj)
    setTime(convertTimeArrToStr(timeArr));
    props.setValue(timeArr[0]*60*60 + timeArr[1]*60 + timeArr[2]);
  }

  // Adjust time by manually entering a new time
  const handleBlur = (rawStr: string) => {
    const noColons = rawStr.split(':').join('');
    if (!isAllNumbers(noColons)) return setTime(secToTimeStr(props.value));;
    const [h, m, s] = convertTimeStrToArr(noColons);
    let sec = h*60*60+m*60+s;
    if (sec >= 60 * 60 * 24) sec = 60 * 60 * 24 - 1;
    setTime(secToTimeStr(sec));
    props.setValue(sec);
  };

  const handleChange = (str: string) => {
    setTime(str);
  };

  return (
    <>
      { props.disabled || <i className="fa fa-plus-square" onClick={e => handleClick(1)}></i>}
      <input
        value={time}
        onFocus={e => e.target.select()}
        onChange={e => handleChange(e.target.value)}
        onBlur={e => handleBlur(e.target.value)}
        name={props.name}
        type='text'
        step={props.format === 'clock' ? 60 : 1}
        disabled={props.disabled}
      />
      { props.disabled || <i className="fa fa-minus-square" onClick={e => handleClick(-1)}></i>}
    </>
  )
}

export default StepInputTimer