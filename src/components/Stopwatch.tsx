import React, { useState, useEffect } from 'react';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import Button from './Button';
import Category from './Category';
import Timer from './ReadOnlyTimer';
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

const records: Data[] = []

/* TODO
- Render calendar as a layer on top of the rest of the page, so it doesn't move other elements around
- On date change, update y, m, d of start-time in state and db
*/

const Stopwatch = () => {
  const [description, setDescription] = useState('');
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false)
  const [isTimerActive, setIsTimerActive] = useState(false)
  const [timerObj, setTimerObj] = useState({...data});


  useEffect(() => {
    if (timerObj.end_time) {
      records.push(timerObj)
      console.log(records);
      setTimerObj({...data})
    }
  }, [timerObj])


  const calendarState = (value: Date) => {
    console.log(value);
    setCalendarDate(value)
    setShowCalendar(!showCalendar)
    // Update task start time with new year, month, day
  }

  const handleStartTimeAdjust = (newTime: Date) => {
    setTimerObj(prev => {
      return {
        ...prev,
        start_time: newTime
      }
    })
  }

  const handleTimerState = (timerState: string) => {
    switch (timerState) {
      case 'SAVE':
        setIsTimerActive(false)
        setTimerObj(prev => {
          const endTime = timerObj.pause_start_time || new Date()
          return {
            ...prev, 
            end_time: endTime
          };
        })
        break;
      case 'PAUSE':
        setIsTimerActive(false)
        setTimerObj(prev => {
          return {
            ...prev, 
            pause_start_time: new Date()
          }
        })
        break;
      case 'PLAY':
        setIsTimerActive(true);
        if (timerObj.pause_start_time) {
          const old_pause_dur = timerObj.cumulative_pause_duration
          const new_pause_dur = Number(new Date()) - Number(timerObj.pause_start_time) + Number(old_pause_dur)
          setTimerObj(prev => {
            return {
              ...prev, 
              cumulative_pause_duration: new_pause_dur,
              pause_start_time: null
            };
          })
        } else {
          setTimerObj(prev => {
            const startTime = timerObj.start_time || new Date()
            return {
              ...prev, 
              start_time: startTime
            };
          })
        }
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
            start_time={timerObj.start_time}
            startTimeAdjust={handleStartTimeAdjust}
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
          timerObj={timerObj}
          isTimerActive={isTimerActive}
        />

        {!isTimerActive &&
          <Button play onClick={(e: any) => handleTimerState("PLAY")}>
            <i className="far fa-play-circle fa-lg"></i>
          </Button>
        }

        {isTimerActive &&
          <Button pause onClick={(e: any) => handleTimerState("PAUSE")}>
            <i className="far fa-pause-circle fa-lg"></i>
          </Button>
        }

        <Button stop onClick={(e: any) => handleTimerState("SAVE")}>
          <i className="far fa-save fa-lg"></i>
        </Button>
        
        <Category />
    </>
  )
}

export default Stopwatch;