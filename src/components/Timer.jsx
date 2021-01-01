import React, { useState, useEffect } from 'react';

const convertDateToUTC = (date) => {
  const utc = new Date(date).toISOString();
  return Date.parse(utc);
}

// TIMENOW Thu Dec 31 2020 17: 11: 42 GMT - 0800(Pacific Standard Time)
// TIMENOW Fri Jan 01 2021 01: 12: 39 GMT - 0800(Pacific Standard Time)

const calculateTime = (startTime) => {

  console.log(`INSIDE`, startTime, startTime.value)
  if (startTime.value) {
    console.log("DID I FIRE?")
    let timeNow = convertDateToUTC(new Date());
    console.log("TIMENOW", timeNow)
    let start = convertDateToUTC(new Date(startTime.value.start));
    console.log("START", start)
    let pause;
    let difference;

    if (startTime.value.pause) {
      pause = convertDateToUTC(new Date(startTime.value.pause));
      console.log("pause fired", pause)
      const initStart = start;
    } 

    if (pause) {
      start = newStart;
      console.log(`START`, start)
    } 

      difference = timeNow - start;
  
    const timeDifference = {
      hours: ('0' + Math.floor((difference / (1000 * 60 * 60)) % 24)).slice(-2),
      minutes: ('0' + Math.floor((difference / 1000 / 60) % 60)).slice(-2),
      seconds: ('0' + Math.floor((difference / 1000) % 60)).slice(-2)
    }

    return timeDifference;
  }

  return null;
}

const Timer = ({ startTime }) => {
  const [accumTime, setAccumTime] = useState(calculateTime(startTime));
  console.log("ACCUM TIME", accumTime)

  useEffect(() => {
    console.log("Inside useEffect")
    if(startTime.action === 'start'){
      const timer = setInterval(() => {
        setAccumTime(calculateTime(startTime));
      }, 1000);

      return () => clearInterval(timer);
    }

    if (startTime.action === 'stop') {
      setAccumTime(calculateTime(startTime));
    }
  }, [startTime]);

  return (
    <>
    {!accumTime &&
    <div>
      00 : 00 : 00
    </div>
    }

    {accumTime && 
    <div>
      {accumTime.hours} : {accumTime.minutes} : {accumTime.seconds}
    </div>
    }
    </>
  );
};

export default Timer;