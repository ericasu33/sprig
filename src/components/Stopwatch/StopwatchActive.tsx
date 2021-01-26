import React, { useState, useEffect } from 'react';
import Button from '../Button';
import Categories from './Categories';
import Tags from './Tags';
import StepInputClock from '../StepInputClock'
import StepInputInt from '../StepInputInt'
import StopwatchTime from './StopwatchTime';
import 'react-calendar/dist/Calendar.css';
import './Stopwatch.scss'

import {ITag, ICategory, IEntry} from 'ts-interfaces/interfaces';

const blankActiveEntry: IEntry = {
  category: null,
  tags: null,
  start_time: null,
  end_time: null,
  intensity: 1,
  pause_start_time: null,
  cumulative_pause_duration: 0,
};

const StopwatchActive = (props: any) => {
  const [allCategories, setAllCategories] = useState(props.allCategories);
  const [allTags, setAllTags] = useState(props.allTags);  
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [activeEntry, setActiveEntry] = useState(props.activeEntry || blankActiveEntry);
  
  useEffect(() => {
    if (activeEntry.id) {
      setIsTimerRunning(true)
      // set start_time? or is that done automatically somewhere else?
    }
  }, [])

  useEffect(() => {
    if (activeEntry.end_time) {
      props.saveNewEntry(activeEntry)
      console.log('SAVED ENTRY:', activeEntry);
      setActiveEntry(blankActiveEntry)
    }
  }, [activeEntry])

  // Update start_time if InputClock is manually adjusted
  const updateActiveEntry = (key: string, value: Date | number | null | ICategory | ITag[], action = null) => {
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
      
      const promise = props.handleChangeEntryTags(activeEntry.id, tag, remove);
      promise.then((id: number | undefined) => {
        if (!id) return id;
        setActiveEntry({
          ...activeEntry,
          tags: value,
        });
      });
      return promise;
    }
    setActiveEntry({
      ...activeEntry,
      [key]: value
    });
    return Promise.resolve();
  }

  const addCategory = (category: ICategory) => {
    return props.createNewCategory(category).then((id: number | undefined) => {
      if (!id) return;
      setAllCategories((prev: ICategory[]) => {
        return [...prev, { ...category, id}]
      });
    });
  };

  const addTag = (tag: ITag) => {
    return props.createNewTag(tag).then((id: number | undefined) => {
      if (!id) return;
      setAllTags((prev: ITag[]) => {
        return [...prev, { ...tag, id}]
      });
    });
  };

  // Manage activeEntry data based on PLAY, PAUSE, SAVE 'states' (i.e. most recent button clicked)
  const handleTimerState = (timerState: string) => {
    switch (timerState) {
      case 'SAVE':
        setIsTimerRunning(false)
        updateActiveEntry('end_time', activeEntry.pause_start_time || new Date())
        break;
      case 'PAUSE':
        setIsTimerRunning(false)
        updateActiveEntry('pause_start_time', new Date())
        break;
      case 'PLAY':
        setIsTimerRunning(true);
        if (activeEntry.pause_start_time) {
          const old_pause_dur = activeEntry.cumulative_pause_duration
          const new_pause_dur = Number(new Date()) - Number(activeEntry.pause_start_time) + Number(old_pause_dur)
          setActiveEntry((prev: IEntry) => {
            return {
              ...prev, 
              cumulative_pause_duration: new_pause_dur,
              pause_start_time: null
            };
          })
        } else {
          updateActiveEntry('start_time', activeEntry.start_time || new Date())
        }
    }
  }

  return (
    <>
      <h4 className="section-header sw-active-header">TASK TRACKER</h4>
      <div className='stopwatch stopwatch-active'>

        <div className='stopwatch-group'>
          <Categories 
            allCategories={props.allCategories}
            createNewCategory={addCategory}
            category={activeEntry.category}
            onChange={updateActiveEntry}
          />
        </div>

        <div className='stopwatch-group sw-tags'>
          <Tags
            allTags={props.allTags}
            createNewTag={addTag}
            tags={activeEntry.tags}
            onChange={updateActiveEntry}
          />
        </div>

        <div className='stopwatch-group sw-inputs'>
          <div className='sw-start-time'>
            {activeEntry.start_time &&
              <StepInputClock
                label='Start Time'
                name='start_time'
                time={activeEntry.start_time}
                onChange={updateActiveEntry}
                allowFuture='false'
              />}
            </div>

          <div className='sw-intensity'>
            <StepInputInt
              label='Intensity'
              name='intensity'
              value={activeEntry.intensity}
              setValue={updateActiveEntry}
              stepSize='0.05'
              min='0'
              max='1'
              percent
            />
          </div>
        </div>

        <div className='stopwatch-group sw-calc-times'>
          <StopwatchTime 
            activeEntry={activeEntry}
            isTimerRunning={isTimerRunning}
          />
        </div>

        <div className='stopwatch-group sw-buttons-right'>
          {!isTimerRunning && 
            <Button play onClick={(e: any) => handleTimerState("PLAY")} />}
          {isTimerRunning && 
            <Button pause onClick={(e: any) => handleTimerState("PAUSE")} />}
          {activeEntry.start_time && 
            <Button save onClick={(e: any) => handleTimerState("SAVE")} />}
        </div>
      </div>
    </>
  )
}

export default StopwatchActive;
