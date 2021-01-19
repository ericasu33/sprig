import React, { useState, useEffect } from 'react';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import Button from './Button';
import Category from './Category';
import StepInputInt from './StepInputInt'
import StepInputClock from './StepInputClock'
import './StopwatchEntry.scss'
import StepInputTimer from './StepInputTimer';

// interface Data {
//   start_time: (Date | null),
//   end_time: (Date | null),
//   pause_start_time: (Date | null),
//   cumulative_pause_duration: (number | null)
// }

// const dummyData: Data = {
//   start_time: new Date(1611021345965),
//   end_time: new Date(1611029345965),
//   pause_start_time: null,
//   cumulative_pause_duration: 0,
// };

// const records: Data[] = []

const Stopwatch = (props: any) => {
  const [description, setDescription] = useState(props.description);
  const [calendarDate, setCalendarDate] = useState(new Date(new Date(props.start_time).setHours(0,0,0,0)));
  const [showCalendar, setShowCalendar] = useState(false)
  const [totalTime, setTotalTime] = useState(0)
  const [timerObj, setTimerObj] = useState({
    start_time: props.start_time,
    end_time: props.end_time
  });

  useEffect(() => {
    setTotalTime(props.end_time - props.start_time - props.cumulative_pause_duration)

    // Update calendarDate when timerObj.start_time is updated
    if (timerObj.start_time) {
      const newCalendarDate: number = new Date(Number(timerObj.start_time)).setHours(0,0,0,0)
      setCalendarDate(new Date(newCalendarDate));
    }

  }, [timerObj.start_time, timerObj.end_time])

  // Adjust start_time and end_time (if not null) by difference between old date and newly chosen date
  const calendarState = (value: Date) => {
    const dateDiff: number = Number(calendarDate) - Number(value);
    setCalendarDate(value)
    setShowCalendar(!showCalendar)
    setTimerObj((prev: any) => {
      const startTime = new Date(Number(timerObj.start_time) - dateDiff)
      const endTime = timerObj.end_time ? new Date(Number(timerObj.end_time) - dateDiff) : null
      return {
        ...prev,
        start_time: startTime,
        end_time: endTime
      }
    })    
  }

  // Update start_time if InputClock is manually adjusted
  const handleTimeAdjust = (newTime: Date, timeType: string) => {
    setTimerObj((prev: any) => {
      return {
        ...prev,
        [timeType]: newTime
      }
    })
  }

  // Manage timerObj data based on PLAY, PAUSE, SAVE 'states' (i.e. most recent button clicked)
  const handleTimerState = (timerState: string) => {
    // switch (timerState) {
    //   case 'SAVE':
    //     setIsTimerActive(false)
    //     setTimerObj(prev => {
    //       const endTime = timerObj.pause_start_time || new Date()
    //       return {
    //         ...prev, 
    //         end_time: endTime
    //       };
    //     })
    //     break;
    //   case 'PAUSE':
    //     setIsTimerActive(false)
    //     setTimerObj(prev => {
    //       return {
    //         ...prev, 
    //         pause_start_time: new Date()
    //       }
    //     })
    //     break;
    //   case 'PLAY':
    //     setIsTimerActive(true);
    //     if (timerObj.pause_start_time) {
    //       const old_pause_dur = timerObj.cumulative_pause_duration
    //       const new_pause_dur = Number(new Date()) - Number(timerObj.pause_start_time) + Number(old_pause_dur)
    //       setTimerObj(prev => {
    //         return {
    //           ...prev, 
    //           cumulative_pause_duration: new_pause_dur,
    //           pause_start_time: null
    //         };
    //       })
    //     } else {
    //       setTimerObj(prev => {
    //         const startTime = timerObj.start_time || new Date()
    //         return {
    //           ...prev, 
    //           start_time: startTime
    //         };
    //       })
    //     }
    // }
  }


  // <form
  //   id="form1"
  //   autoComplete='off'
  //   onSubmit={event => event.preventDefault()}
  // />
  
  // <form
  //   id="form2"
  //   autoComplete='off'
  //   onSubmit={event => event.preventDefault()}
  // />
  return (
    <div className='stopwatch'>

      <Category />

      {/* <Task description />  */}
      <div>
        <input
          value={description}
          onChange={(event) => setDescription(event.target.value)}
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
          name='start_time'
          time={timerObj.start_time}
          timeAdjust={handleTimeAdjust}
          allowFuture='true'
        />
      </div>

      <div>
        <StepInputClock
          name='end_time'
          time={timerObj.end_time}
          timeAdjust={handleTimeAdjust}
          allowFuture='true'
        />
      </div>

      {/* <Intensity /> */}
      <StepInputInt
        name='intensity'
        value={props.intensity}
        stepSize='5'
        min='0'
        max='100'
        percent
      />

      <StepInputTimer
        name="Total time"
        value={totalTime}
        disabled
      />
    
      <StepInputTimer
        name="Effective time"
        value={totalTime * props.intensity / 100}
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