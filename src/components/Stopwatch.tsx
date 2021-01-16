import React, { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import Button from './Button';
import Category from './Category';
import Timer from './Timer';
import StepInputInt from './StepInputInt'
import StepInputClock from './StepInputClock'
import './Stopwatch.scss'

interface Data {
  [key: string]: Date;
}

const data: Data = {};

/* TODO
- Render calendar as a layer on top of the rest of the page, so it doesn't move other elements around
- Link Start time in functions to time passed to stepInputClock
- On date change, update y, m, d of start-time in state and db
- Debug play/pause, sometimes it renders as a weird time with letters?
- Change 'stop' to 'save', save the data and reset the component
DONE Set clock start time to have max time of .now()
*/

const Stopwatch = () => {
  const [description, setDescription] = useState('');
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false)
  const [isActiveTimer, setIsActiveTimer] = useState(false)
  const [initTimer, setInitTimer] = useState({
    start: null,
    pause: null,
    stop: null,
    action: null,
  });

  const calendarState = (value: Date) => {
    console.log(value);
    
    setCalendarDate(value)
    setShowCalendar(!showCalendar)
  }

  const timerAction = (timephase: string) => {
    setIsActiveTimer(() => {
      if (timephase === 'stop') return false
      return !isActiveTimer;
    })

    setInitTimer( (prev: any) => {
      if (timephase !== 'start' || !data[timephase]) data[timephase] = new Date();
      return {
        ...prev,
        stop: null,
        [timephase]: data[timephase],
        action: timephase,
      };
    });
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

        <Timer 
          startTime = {initTimer}
        />

        {!isActiveTimer &&
          <Button play onClick={(e: any) => timerAction("start")}>
            <i className="far fa-play-circle fa-lg"></i>
          </Button>
        }

        {isActiveTimer &&
          <Button pause onClick={(e: any) => timerAction("pause")}>
            <i className="far fa-pause-circle fa-lg"></i>
          </Button>
        }

        <Button stop onClick={(e: any) => timerAction("stop")}>
          <i className="far fa-save fa-lg"></i>
        </Button>
        
        <Category />
    </>
  )
}

export default Stopwatch;