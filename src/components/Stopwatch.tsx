import React, { useState, useEffect } from 'react';
import 'react-calendar/dist/Calendar.css';
import Button from './Button';
import Category from './Category';
import StopwatchTime from './StopwatchTime';
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
*/

const Stopwatch = () => {
  const [description, setDescription] = useState('');
  const [isTimerActive, setIsTimerActive] = useState(false)
  const [timerObj, setTimerObj] = useState({...data});

  useEffect(() => {
    // Send data to DB and reset stopwatch on 'SAVE'
    if (timerObj.end_time) {
      records.push(timerObj)
      console.log(records);
      setTimerObj({...data})
    }
  }, [timerObj])

  // Update start_time if InputClock is manually adjusted
  const updateTimerObj = (key: string, value: Date | number | null) => {
    setTimerObj({
      ...timerObj,
      [key]: value
    })
  }

  const handleStartTimeAdjust = (newTime: Date) => {
    setTimerObj(prev => {
      return {
        ...prev,
        start_time: newTime
      }
    })
  }

  // Manage timerObj data based on PLAY, PAUSE, SAVE 'states' (i.e. most recent button clicked)
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

      <Category />

      {/* <Task description />  */}
      <div>
        <input
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          // onBlur={e => updateTimerObj('description', e.target.value)}
          name='desc'
          type='text'
          form='form1'
          placeholder='enter task description'
          size={50}
        />
      </div>

      {/* <StartEndTime />  */}
      <div className='clock-start-time'>
        {timerObj.start_time &&
          <StepInputClock
            label='Start Time'
            name='start_time'
            time={timerObj.start_time}
            onChange={handleStartTimeAdjust}
            allowFuture='false'
          />}
        </div>

      {/* <Intensity /> */}
      <span className='intensityPadding'>
        <StepInputInt
          label='Intensity'
          name='intensity'
          value='90'
          // onChange={}
          stepSize='5'
          min='0'
          max='100'
        /> 
        %
      </span>

      <StopwatchTime
        timerObj={timerObj}
        isTimerActive={isTimerActive}
      />

      {!isTimerActive &&
        <Button play onClick={(e: any) => handleTimerState("PLAY")}>
          <i className="far fa-play-circle"></i>
        </Button>
      }

      {isTimerActive &&
        <Button pause onClick={(e: any) => handleTimerState("PAUSE")}>
          <i className="far fa-pause-circle"></i>
        </Button>
      }

      <Button stop onClick={(e: any) => handleTimerState("SAVE")}>
        <i className="far fa-save"></i>
      </Button>
    </div>
  )
}

export default Stopwatch;