import React, { useState, useEffect } from 'react';
import 'react-calendar/dist/Calendar.css';
import Button from './Button';
import Category from './Category';
import StopwatchTime from './StopwatchTime';
import StepInputInt from './StepInputInt'
import StepInputClock from './StepInputClock'
import './Stopwatch.scss'

interface Tag {
  id: number,
  tag: string | null
}

// interface Category {
//   id: number,
//   name: string | null,
//   color: string | null
// }

interface Data {
  id: number,
  category: Category | null,
  tags: Tag[] | null,
  description: string | null,
  start_time: Date | null,
  end_time: Date | null,
  intensity: number | null
  pause_start_time: Date | null,
  cumulative_pause_duration: number | null
}

const dummyData: Data = {
  id: 1,
  category: null,
  tags: null,
  description: null,
  start_time: null,
  end_time: null,
  intensity: 100,
  pause_start_time: null,
  cumulative_pause_duration: 0,
};

const records: Data[] = []

const StopwatchActive = () => {
  const [description, setDescription] = useState('');
  const [isTimerActive, setIsTimerActive] = useState(false)
  const [timerObj, setTimerObj] = useState({...dummyData});

  useEffect(() => {
    // Send data to DB and reset stopwatch on 'SAVE'
    if (timerObj.end_time) {
      records.push(timerObj)
      console.log(records);
      setTimerObj({...dummyData})
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


      // <div className='stopwatch-group sw-categories'>
      //   <Category 
      //     categories={props.categories}
      //     updateCategory={updateEntry}
      //   />
      // </div>

      // {/* <Task description />  */}
      // <div className='stopwatch-group sw-tags'>
      //   <Tags
      //     tags={props.tags}
      //     onChange={updateEntry}
      //   />
      // </div>
  return (
    <div className='stopwatch'>


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
      <div className='stopwatch-input-int'>
        <StepInputInt
          label='Intensity'
          name='intensity'
          value='90'
          // onChange={}
          stepSize='5'
          min='0'
          max='100'
          percent
        />
      </div>

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

export default StopwatchActive;
