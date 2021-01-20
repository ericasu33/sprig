import React, { useState, useEffect } from 'react';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import Button from './Button';
import Category from './Category';
import StepInputClock from './StepInputClock'
import StepInputInt from './StepInputInt'
import StepInputTimer from './StepInputTimer';
import './StopwatchEntry.scss'

// This function sets hours, minutes, seconds, milliseconds to zero
// ... used so that calendarDate is always midnight, consistent with return from 'react-calendar'
const setDateToLocalMidnight = (date: Date) => new Date(new Date(date).setHours(0,0,0,0))

const Stopwatch = (props: any) => {
  const [description, setDescription] = useState(props.description);
  const [calendarDate, setCalendarDate] = useState(setDateToLocalMidnight(props.start_time));
  const [showCalendar, setShowCalendar] = useState(false)
  const [totalTime, setTotalTime] = useState(0)
  const [entry, setEntry] = useState(props);  

  useEffect(() => {
    setTotalTime(props.end_time - props.start_time - props.cumulative_pause_duration)
    setCalendarDate(setDateToLocalMidnight(props.start_time));
  }, [props])

  // Adjust start_time and end_time (if not null) by difference between old date and newly chosen date
  const calendarState = (value: Date) => {
    const dateDiff: number = Number(calendarDate) - Number(value);
    setCalendarDate(value)
    setShowCalendar(!showCalendar)
    setEntry((prev: any) => {
      const startTime = new Date(Number(props.start_time) - dateDiff)
      const endTime = new Date(Number(props.end_time) - dateDiff)
      return {
        ...prev,
        start_time: startTime,
        end_time: endTime
      }
    })    
  };

  // Update start_time if InputClock is manually adjusted
  const updateEntry = (key: string, value: Date | string | number) => {
    props.onChange({
      ...props,
      [key]: value
    })
  };

  // Manage timerObj data based on PLAY, PAUSE, SAVE 'states' (i.e. most recent button clicked)
  const handleTimerState = (timerState: string) => {

  }


  return (
    <div className='stopwatch'>
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

      <Category 
        category_name={props.category}
      />

      {/* <Task description />  */}
      <div>
        <input
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          onBlur={e => updateEntry('description', e.target.value)}
          name='desc'
          type='text'
          form='form1'
          placeholder='enter task description'
          size={50}
        />
      </div>

      {/* <StartEndTime />  */}
      <div>
        <StepInputClock
          label='Start time'
          name='start_time'
          time={props.start_time}
          onChange={updateEntry}
          allowFuture='true'
        />
      </div>

      <div>
        <StepInputClock
          label='End time'
          name='end_time'
          time={props.end_time}
          onChange={updateEntry}
          allowFuture='true'
        />
      </div>

      {/* <Intensity /> */}
      <StepInputInt
        label='Intensity'
        name='intensity'
        value={props.intensity}
        setValue={updateEntry}
        stepSize='5'
        min='0'
        max='100'
        percent
      />

      <StepInputTimer
        label="Total time"
        value={totalTime / 1000}
        disabled
      />
    
      <StepInputTimer
        label="Effective time"
        value={totalTime / 1000 * props.intensity / 100}
        disabled
      />
      
      <Button onClick={() => setShowCalendar(!showCalendar)}>
        <i className='fa fa-calendar-alt'></i>
      </Button>
      {showCalendar && 
        <Calendar 
          value={calendarDate}
          onClickDay={(value: Date) => calendarState(value)}
        />
      }

      <Button play onClick={(e: any) => handleTimerState("PLAY")}>
        <i className="far fa-play-circle"></i>
      </Button>

      <Button duplicate onClick={(e: any) => handleTimerState("SAVE")}>
        <i className="far fa-clone"></i>
      </Button>

      <Button delete onClick={(e: any) => handleTimerState("SAVE")}>
        <i className="far fa-trash-alt"></i>
      </Button>
    </div>
  )
}

export default Stopwatch;