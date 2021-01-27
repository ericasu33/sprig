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

import { ITag } from '../../ts-interfaces/interfaces';

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
  const updateCalendar = (value: Date) => {
    const dateDiff: number = Number(calendarDate) - Number(value);
    setCalendarDate(value)
    setShowCalendar(!showCalendar)
    const startTime = new Date(Number(props.entry.start_time) - dateDiff)
    const endTime = new Date(Number(props.entry.end_time) - dateDiff)
    return props.updateEntry({
      ...props.entry,
      start_time: startTime,
      end_time: endTime
    }, 'UPDATE')
  };

  // Update start_time if InputClock is manually adjusted
  const updateEntry = (key: string, value: Date | string | number, action: any = null) => {
    const actionType: any = action;
    if (key === "tags") {
      let tag: ITag = { id: null, label: ""};
      let remove: boolean = true;
      if (actionType === null) return;
      else if (actionType.action === "remove-value") {
        tag = {...actionType.removedValue};
      } else if (actionType.action === "select-option") { 
        tag = {...actionType.option};
        remove = false;
      } else if (actionType.action === "clear") {
        tag = { id: null, label: "" };
      }
      const promise = props.updateEntryTags(entry.id, tag, remove);
      return promise.then((id: number | undefined) => {
        if (!id) return id;
        props.updateEntry({
          ...props.entry,
          tags: value
        }, "UPDATE_TAGS");
        return id;
      });
    }
    return props.updateEntry({
      ...props.entry,
      [key]: value
    }, 'UPDATE')
  };


  return (
    <div className='stopwatch'>

      <div className='stopwatch-group'>
        <Categories 
          allCategories={props.allCategories}
          createNewCategory={props.createNewCategory}
          updateCategory={props.updateCategory}
          category={props.entry.category}
          onChange={updateEntry}
        />
      </div>

      <div className='stopwatch-group sw-tags'>
        <Tags
          allTags={props.allTags}
          createNewTag={props.createNewTag}
          updateEntryTags={props.updateEntryTags}
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
            maxTime={props.entry.end_time}
          />
        </div>
        -
        <div className='sw-input-clock'>
          <StepInputClock
            label='End time'
            name='end_time'
            time={props.entry.end_time}
            onChange={updateEntry}
            maxTime='now'
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
              <Calendar
                value={calendarDate}
                onClickDay={(value: Date) => updateCalendar(value)}
                locale='en-CA'
              />
            </div>
          }
        </div>
        
      </div>

      <div className='stopwatch-group sw-calc-times'>
        <StepInputTimer
          label="Total time"
          value={Math.floor(totalTime / 1000)}
          disabled
        />
      
        <StepInputTimer
          label="Effective time"
          value={Math.floor(totalTime / 1000 * props.entry.intensity / 100)}
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
