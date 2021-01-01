import React, { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import Button from './Button';
import Timer from './Timer';
import StepInput from './StepInput'
import StepInputTime from './StepInputTime'
import './Entries.scss'


function Entries() {
  const data = [1, 1, 'final-planning', '2020-12-30 00:18:02+00', '2020-12-30 20:05:23+00', 200, 1];
  const [desc, setDesc] = useState('');
  const [calendarValue, setCalendarValue] = useState(new Date());
  const [initTimer, setInitTimer] = useState('');
  const [toggle, setToggle] = useState({
    calendar: false,
    pause: false,
    play: true,
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

  const timerAction = (action) => {
    setToggle(prev => {
      return {
        ...prev,
        play: !prev.play,
        pause: !prev.pause,
      };
    })
    setInitTimer(action);
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
          <StepInputTime
            name='startTime'
            format='hh:mm'
            // time={getLocalTimeNow}
            // h={getLocalTimeNow.getHours()}
            // m={getLocalTimeNow.getMinutes()}
            // s={getLocalTimeNow.getSeconds()}
            value={new Date()}
            stepSize={1000 * 60}
          />
        </div>
        {/* no manual input yet */}

        {/* <Intensity /> */}
        <span className='intensityPadding'>
          <StepInput
            name='intensity'
            format='int'
            value='90'
            stepSize='5'
          /> 
          %
        </span>
     

        <i 
          className='fa fa-calendar-alt fa-lg'
          onClick={(e) => setToggle(prev => {
            return {
              ...prev, 
              calendar: !prev.calendar
            };
          })
        }
        >
          {calendarValue.getMonth() + 1}/{calendarValue.getDate()}
        </i>
      
 
        {toggle.calendar && 
        <Calendar 
          value = {calendarValue}
          onClickDay={(value, event) => calendarState(value)}

        /> 
        }

        <Timer 
          startTime = {initTimer}
        />

        {toggle.play &&
          <Button
            onClick={(e) => timerAction(new Date())}
          >
            <i className="far fa-play-circle fa-lg"></i>
          </Button>
        }


        {toggle.pause &&
          <Button
          // onClick={(e) => timerAction('')}
          >
            <i className="far fa-pause-circle fa-lg"></i>
          </Button>
        }


        <Button
          onClick={(e) => timerAction('')}
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