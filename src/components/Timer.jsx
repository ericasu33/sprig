import React, { useState, useEffect } from 'react';

const Timer = ({ startTime }) => {
  console.log(`STARTTIME ${startTime}`);

  const convertDateToUTC = (date) => { 
    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()); 
  }

  const calculateTime = () => {
    console.log(`INSIDE`, startTime)
    if(startTime){
      console.log("DID I FIRE?")
      const timeNow = convertDateToUTC(new Date());
      const start = convertDateToUTC(new Date(startTime));
      const difference = timeNow - start;

      const timeDifference = {
        hours: ('0' + Math.floor((difference / (1000 * 60 * 60)) % 24)).slice(-2),
        minutes: ('0' + Math.floor((difference / 1000 / 60) % 60)).slice(-2),
        seconds: ('0' + Math.floor((difference / 1000) % 60)).slice(-2)
      }
      
      return timeDifference;
    }

   return null;
  }

  const [accumTime, setAccumTime] = useState(calculateTime());
  console.log("ACCUM TIME", accumTime)

  useEffect(() => {
    console.log("Inside useEffect")
    if(startTime){
      const timer = setInterval(() => {
        setAccumTime(calculateTime());
      }, 1000);

      return () => clearInterval(timer);
    }
    setAccumTime(calculateTime());
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