import React, { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import Button from './Button';
import Timer from './Timer';
import './Entries.scss'

const data = {};

const Entries = () => {
  // const data = [1, 1, 'final-planning', '2020-12-30 00:18:02+00', '2020-12-30 20:05:23+00', 200, 1];

  const [desc, setDesc] = useState('');
  const [intensity, setIntensity] = useState(100);
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

  const calendarState = (value) => {
    setCalendarValue(value)
    setToggle(prev => {
      return {
        ...prev,
        calendar: !prev.calendar,
      };
    })
  }

  const timerAction = (timephase) => {
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


    setInitTimer(prev => {
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


  return (
    <>
      <form
        autoComplete='off'
        onSubmit={event => event.preventDefault()}
      >

        {/* <EntryDesc />  */}
        <div>
          <input
            value={desc}
            onChange={(event) => setDesc(event.target.value)}
            name='desc'
            type='text'
            placeholder='What are you working on?'
            size='50'
          />
        </div>

        {/* <StartEndTime />  */}
        <div>
            {getLocalTimeNow}
        </div>
        {/* no manual input yet */}

        {/* <Intensity /> */}
        <span className='intensityPadding'>
          <input
            type='number'
            min='0'
            max='100'
            value={intensity}
            onChange={(event) => setIntensity(event.target.value)}
          /> 
          %
        </span>
     
        <Button 
          onClick={(e) => setToggle(prev => {
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
          onClickDay={(value, event) => calendarState(value)}

        /> 
        }

        <Timer 
          startTime = {initTimer}
        />

        {!toggle.play &&
          <Button
            play
            onClick={(e) => timerAction("start")}
          >
            <i className="far fa-play-circle fa-lg"></i>
          </Button>
        }


        {toggle.play &&
          <Button
          pause
          onClick={(e) => timerAction("pause")}
          >
            <i className="far fa-pause-circle fa-lg"></i>
          </Button>
                 }


        <Button
          stop
          onClick={(e) => timerAction("stop")}
        >
          <i className="far fa-stop-circle fa-lg"></i>
        </Button>

        {/* https://www.npmjs.com/package/react-calendar */}
        {/* <TimerDuration /> */}

        

        {/* <Button /> */}
        {/* Pass in img as prop & conditionals to render the component diff */}
        {/* Play/Pause/Stop/Duplicate/Delete */}

        {/* <ModeToggle /> STRETCH */}

      </form>
    </>
  )
}

export default Entries;