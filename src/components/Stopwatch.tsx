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

const Stopwatch = () => {
  // const data = [1, 1, 'final-planning', '2020-12-30 00:18:02+00', '2020-12-30 20:05:23+00', 200, 1];

  const [desc, setDesc] = useState('');
  const [calendarValue, setCalendarValue] = useState(new Date());
  const [initTimer, setInitTimer] = useState({
    start: null,
    pause: null,
    stop: null,
    action: null,
  });

  const [toggle, setToggle] = useState({
    calendar: false,
    play: false,
  })

  const calendarState = (value: any) => {
    setCalendarValue(value)
    setToggle(prev => {
      return {
        ...prev,
        calendar: !prev.calendar,
      };
    })
  }

  const timerAction = (timephase: string) => {
    setToggle(prev => {
      if (timephase === 'stop') {
        return {
          ...prev,
          play: false,
        };
      }

      return {
        ...prev,
        play: !prev.play,
      };
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

  // https://stackoverflow.com/questions/10599148/how-do-i-get-the-current-time-only-in-javascript
  const getLocalTimeNow = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  // const getLocalTimeNow = new Date()
  // const test = {a: 1, b:2}
  // const test2 = ['a', 'b']


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

        {/* <EntryDesc />  */}
        <div>
          <input
            value={desc}
            onChange={(event) => setDesc(event.target.value)}
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
          />
        </div>
        {/* no manual input yet */}

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
     
        <Button 
          onClick={(e: any) => setToggle(prev => {
            return {
              ...prev, 
              calendar: !prev.calendar
            };
          })}
        >
        <i className='fa fa-calendar-alt fa-lg'>
          {calendarValue.getMonth() + 1}/{calendarValue.getDate()}
        </i>
        </Button>
      
 
        {toggle.calendar && 
        <Calendar 
          value = {calendarValue}
          onClickDay={(value: any, event: any) => calendarState(value)}

        /> 
        }

        <Timer 
          startTime = {initTimer}
        />

        {!toggle.play &&
          <Button
            play
            onClick={(e: any) => timerAction("start")}
          >
            <i className="far fa-play-circle fa-lg"></i>
          </Button>
        }


        {toggle.play &&
          <Button
          pause
          onClick={(e: any) => timerAction("pause")}
          >
            <i className="far fa-pause-circle fa-lg"></i>
          </Button>
                 }


        <Button
          stop
          onClick={(e: any) => timerAction("stop")}
        >
          <i className="far fa-stop-circle fa-lg"></i>
        </Button>

        {/* https://www.npmjs.com/package/react-calendar */}
        {/* <TimerDuration /> */}
        {/* <Button /> */}
        {/* Pass in img as prop & conditionals to render the component diff */}
        {/* Play/Pause/Stop/Duplicate/Delete */}
        {/* <ModeToggle /> STRETCH */}
        
        <Category />
    </>
  )
}

export default Stopwatch;