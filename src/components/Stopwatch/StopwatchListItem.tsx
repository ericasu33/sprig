import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import ColourPicker from './ColourPicker'
import Button from '../Button';
import Categories from './Categories';
import Tags from './Tags';
import StepInputClock from '../StepInputClock'
import StepInputInt from '../StepInputInt'
import StepInputTimer from '../StepInputTimer';
import 'react-calendar/dist/Calendar.css';
import './Stopwatch.scss'
import StopwatchList from './StopwatchList';

/*  setDateToLocalMidnight sets hours, minutes, seconds, milliseconds to zero
    so that calendarDate is always midnight, consistent with return value
    from 'react-calendar' */
const setDateToLocalMidnight = (date: Date) => new Date(new Date(date).setHours(0,0,0,0))

const StopwatchListItem = (props: any) => {
  const [calendarDate, setCalendarDate] = useState(setDateToLocalMidnight(props.start_time));
  const [showCalendar, setShowCalendar] = useState(false)
  const [totalTime, setTotalTime] = useState(0)
  const [entry, setEntry] = useState(props.entry);  

  useEffect(() => {
    setTotalTime(props.entry.end_time - props.entry.start_time - props.entry.cumulative_pause_duration)
    setCalendarDate(setDateToLocalMidnight(props.entry.start_time));
  }, [props.entry.start_time, props.entry.end_time])

  // Adjust start_time and end_time (if not null) by difference between old date and newly chosen date
  const calendarState = (value: Date) => {
    const dateDiff: number = Number(calendarDate) - Number(value);
    setCalendarDate(value)
    setShowCalendar(!showCalendar)
      const startTime = new Date(Number(props.entry.start_time) - dateDiff)
      const endTime = new Date(Number(props.entry.end_time) - dateDiff)
      props.updateEntry({
        ...props.entry,
        start_time: startTime,
        end_time: endTime
      }, 'UPDATE')
  };

  // Update start_time if InputClock is manually adjusted
  const updateEntry = (key: string, value: Date | string | number) => {
    props.updateEntry({
      ...props.entry,
      [key]: value
    }, 'UPDATE')
  };


  return (
    <div className='stopwatch'>

      <div className='stopwatch-group'>
        <Categories 
          allCategories={props.allCategories}
          updateAllCategories={props.updateAllCategories}
          category={props.entry.category}
          onChange={updateEntry}
        />
      </div>

      <div className='stopwatch-group sw-tags'>
        <Tags
          allTags={props.allTags}
          updateAllTags={props.updateAllTags}
          tags={props.entry.tags}
          onChange={updateEntry}
        />
      </div>

      <div className='stopwatch-group sw-inputs'>

        <div className='sw-input-clock'>
          <StepInputClock
            label='Start time'
            name='start_time'
            time={props.entry.start_time}
            onChange={updateEntry}
            allowFuture='true'
          />
        </div>
        -
        <div className='sw-input-clock'>
          <StepInputClock
            label='End time'
            name='end_time'
            time={props.entry.end_time}
            onChange={updateEntry}
            allowFuture='true'
          />
        </div>

        <div className='sw-input-int'>
          <StepInputInt
            label='Intensity'
            name='intensity'
            value={props.entry.intensity}
            setValue={updateEntry}
            stepSize='5'
            min='0'
            max='100'
            percent
          />
        </div>

        <div>
          <Button calendar onClick={() => setShowCalendar(!showCalendar)} />
          {showCalendar && 
            <div className='show-calendar'>
              <div style={ {position: 'fixed', inset: 0} } onClick={() => setShowCalendar(false)} />
                <Calendar
                  value={calendarDate}
                  onClickDay={(value: Date) => calendarState(value)}
                  locale='en-CA'
                />
            </div>
          }
        </div>
        
      </div>

      <div className='stopwatch-group sw-calc-times'>
        <StepInputTimer
          label="Total time"
          value={totalTime / 1000}
          disabled
        />
      
        <StepInputTimer
          label="Effective time"
          value={totalTime / 1000 * props.entry.intensity / 100}
          disabled
        />
      </div>

      <div className='stopwatch-group sw-buttons-right'>
        <Button play onClick={(e: any) => props.updateEntry(props.entry, "PLAY")} />
        <Button clone onClick={(e: any) => props.updateEntry(props.entry, "CLONE")} />
        <Button delete onClick={(e: any) => props.updateEntry(props.entry, "DELETE")} />
      </div>
    </div>
  )
}

export default StopwatchListItem;