import React, { useState, useEffect } from 'react';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import Button from './Button';
import Category from './Category';
import Timer from './Timer';
import StepInputInt from './StepInputInt'
import StepInputClock from './StepInputClock'
import './Stopwatch.scss'

interface Data {
  [key: string]: Date | number | null;
}

const data: Data = {
  start_time: null,
  end_time: null,
  pause_start_time: null,
  cumulative_pause_duration: 0
};

/* TODO
- Render calendar as a layer on top of the rest of the page, so it doesn't move other elements around
- Link Start time in functions to time passed to stepInputClock
- On date change, update y, m, d of start-time in state and db
- Debug play/pause, sometimes it renders as a weird time with letters?
- Change 'stop' to 'save', save the data and reset the component
*/

const Stopwatch = () => {
  const [description, setDescription] = useState('');
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false)
  const [isTimerActive, setIsTimerActive] = useState(false)
  const [timerVal, setTimerVal] = useState(0) // is a number of milliseconds
  const [timerObj, setTimerObj] = useState({...data});


  useEffect(() => {
    if (isTimerActive) {
      const timer = setInterval(() => {
        setTimerVal(Number(new Date()) - Number(timerObj.start_time) - Number(timerObj.cumulative_pause_duration));
      }, 1000);
      
      return () => clearInterval(timer);
    }
    if (timerObj.end_time) {
      setTimerVal(0)
    }
  }, [timerObj, isTimerActive])


  const calendarState = (value: Date) => {
    console.log(value);
    setCalendarDate(value)
    setShowCalendar(!showCalendar)
    // Update task start time with new year, month, day
  }

  const calculateTime = (start: Date, end: Date) => {
    return Number(end) - Number(start);
  }

  const timerAction = (timephase: string) => {
    setIsTimerActive(() => {
      if (timephase === 'end_time') return false
      return !isTimerActive;
    })

    // setTimerObj( (prev: any) => {
    //   if (timephase !== 'start' || !data[timephase]) data[timephase] = new Date();
    //   return {
    //     ...prev,
    //     end: null,
    //     [timephase]: data[timephase],
    //     action: timephase,
    //   };
    // });

    switch (timephase) {
      case 'PLAY':
        setIsTimerActive(true);
        if (timerObj.pause_start_time) {
          const old_pause_dur = timerObj.cumulative_pause_duration
          const new_pause_dur = Number(old_pause_dur) + Number(new Date()) - Number(timerObj.pause_start_time)
          setTimerObj(prev => {
            return {
              ...prev, 
              cumulative_pause_duration: new_pause_dur,
              pause_start_time: null
            };
          })
        } else {
          setTimerObj(prev => {
            return {
              ...prev, 
              start_time: new Date()
            };
          })
        }
        // setTimerVal(Number(new Date()) - Number(timerObj.start_time) - Number(timerObj.cumulative_pause_duration));
        break;
      case 'SAVE':
        setIsTimerActive(false)
        setTimerObj(prev => {
          return {
            ...prev, 
            end_time: new Date()
          };
        })
        // saveToDB
        setTimerObj({...data})
        console.log(timerObj)
        break;
      case 'PAUSE':
        setIsTimerActive(false)
        setTimerObj(prev => {
          return {
            ...prev, 
            pause_start_time: new Date()
          }
        })
        // setTimerVal(Number(timerObj.pause_start_time) - Number(timerObj.start_time))
        break;
    }
  }
  
  
  

  return (
    <>
      <form
        id="form1"
        autoComplete='off'
        onSubmit={event => event.preventDefault()}
      />
      
      <form
        id="form2"
        autoComplete='off'
        onSubmit={event => event.preventDefault()}
      />

        {/* <Task description />  */}
        <div>
          <input
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            name='desc'
            type='text'
            form='form1'
            placeholder='What are you working on?'
            size={50}
          />
        </div>

        {/* <StartEndTime />  */}
        <div>
          <StepInputClock
            name='startTime'
            display={{hour: '2-digit', minute: '2-digit'}}
            value={new Date()}
            allowFuture='false'
          />
        </div>

        {/* <Intensity /> */}
        <span className='intensityPadding'>
          <StepInputInt
            name='intensity'
            value='90'
            stepSize='5'
            min='0'
            max='100'
          /> 
          %
        </span>
     
        <Button onClick={() => setShowCalendar(!showCalendar)}>
          <i className='fa fa-calendar-alt fa-lg'></i>
        </Button>
 
        {showCalendar && 
          <Calendar 
            value = {calendarDate}
            onClickDay={(value: Date) => calendarState(value)}
          /> 
        }

        ---------   
        {Math.floor(Number(timerVal) / 1000)}
           ---------
        <Timer 
          timerObj={timerObj}
        />

        {!isTimerActive &&
          <Button play onClick={(e: any) => timerAction("PLAY")}>
            <i className="far fa-play-circle fa-lg"></i>
          </Button>
        }

        {isTimerActive &&
          <Button pause onClick={(e: any) => timerAction("PAUSE")}>
            <i className="far fa-pause-circle fa-lg"></i>
          </Button>
        }

        <Button stop onClick={(e: any) => timerAction("SAVE")}>
          <i className="far fa-save fa-lg"></i>
        </Button>
        
        <Category />
    </>
  )
}

export default Stopwatch;