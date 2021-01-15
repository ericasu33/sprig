import React, { useEffect, useReducer } from 'react';

const convertDateToUTC = (date: Date) => {
  const utc = new Date(date).toISOString();
  return Date.parse(utc);
}

// TIMENOW Thu Dec 31 2020 17: 11: 42 GMT - 0800(Pacific Standard Time)
// TIMENOW Fri Jan 01 2021 01: 12: 39 GMT - 0800(Pacific Standard Time)

const calculateTime = (startTime: Date, endTime = new Date()) => {

  if (startTime !== undefined) {
    let end = convertDateToUTC(endTime);
    let start = convertDateToUTC(startTime);
    let difference;

    difference = end - start;

    return difference
  }

  return 0;
}

const formatTime = (ms: number) => {
  let time = Math.floor(ms / 1000);
  const mil = Math.floor(ms / 10)  % 100;
  const sec = time % 60;
  time = Math.floor(time / 60);
  const min = time % 60;
  time = Math.floor(time / 60);
  const hr = time % 24;
  const formatMs = `${mil < 10 ? `0${mil}` : mil}`
  const formatSec = `${sec < 10 ? `0${sec}` : sec}`;
  const formatMin = `${min < 10 ? `0${min}` : min}`;
  const formatHr = `${hr < 10 ? `0${hr}` : hr}`;
  return `${formatHr}:${formatMin}:${formatSec}:${formatMs}`;
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "SET_ACCUM":
      const accum = calculateTime(action.start, new Date()) - state.pause;
      return { ...state, accum };
    case "SET_PAUSE":
      if (!action.pause) return state;
      const pause = state.pause + calculateTime(action.pause, new Date());
      return { ...state, pause };
    case "SET_TOTAL_TIME":
      const total_time = calculateTime(action.start, action.stop);
      return { ...state, total_time };
    default:
  }

};

const Timer = (props: any) => {
  const [time, dispatch] = useReducer(reducer, {
    accum: 0,
    pause: 0,
    total_time: 0,
  });

  useEffect(() => {
    if (props.startTime.action === 'start') {
      if (props.startTime.pause) dispatch({ pause: props.startTime.pause, type: "SET_PAUSE" });
      const timer = setInterval(() => {
        dispatch({ start: props.startTime.start, type: "SET_ACCUM"});
      }, 10);
      
      return () => clearInterval(timer);
    }

    if (props.startTime.action === 'stop') {
      dispatch({start: props.startTime.start, stop: props.startTime.stop, type: "SET_TOTAL_TIME"});
    }

  }, [props.startTime]);

  return (
    <>
    <div>
      {formatTime(time.accum)}
    </div>
    </>
  );
};

export default Timer;