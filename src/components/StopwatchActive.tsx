import React, { useState, useEffect } from 'react';
import Button from './Button';
import Categories from './Categories';
import Tags from './Tags';
import StepInputClock from './StepInputClock'
import StepInputInt from './StepInputInt'
import StopwatchTime from './StopwatchTime';
import 'react-calendar/dist/Calendar.css';
import './Stopwatch.scss'

import {ITag, ICategory, IEntry} from '../ts-interfaces/interfaces';

const dummyCategories: ICategory[] = [
  {id: 0, label: 'one', value: 'one', color: '#3eabb7'},
  {id: 1, label: 'two', value: 'two', color: '#d13c3c'},
  {id: 2, label: 'three', value: 'three', color: '#6d31b7'},
]

const dummyTags: ITag[] = [
  {id: 0, label: 'food', value: 'food', color: '#ee0'},
  {id: 1, label: 'dessert', value: 'dessert', color: '#e0e'},
  {id: 2, label: 'icecream', value: 'icecream', color: '#e0e'},
]

const dummyNewTime: IEntry = {
  id: 0,
  category: null,
  tags: null,
  start_time: null,
  end_time: null,
  intensity: 100,
  pause_start_time: null,
  cumulative_pause_duration: 0,
};

const dummyContinueEntry: IEntry = {
  id: 1,
  category: dummyCategories[1],
  tags: [dummyTags[0], dummyTags[1]],
  start_time: new Date(),
  end_time: null,
  intensity: 90,
  pause_start_time: null,
  cumulative_pause_duration: 60000,
};

const incomingData: IEntry = dummyNewTime

const StopwatchActive = (props: any) => {
  const [allCategories, setAllCategories] = useState(dummyCategories);
  const [allTags, setAllTags] = useState(dummyTags);
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [activeEntry, setActiveEntry] = useState(incomingData);
  const [showColourPicker, setShowColourPicker] = useState(false)
  
  useEffect(() => {
    if (activeEntry.id) {
      setIsTimerRunning(true)
    }
  }, [])

  useEffect(() => {
    // updateDatabase(activeEntry)
    if (activeEntry.end_time) {
      console.log('SAVED ENTRY:', activeEntry);
      setActiveEntry(incomingData)
    }
  }, [activeEntry])

  // Update start_time if InputClock is manually adjusted
  const updateActiveEntry = (key: string, value: Date | number | null | ICategory | ITag) => {
    setActiveEntry({
      ...activeEntry,
      [key]: value
    })
  }

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
          setActiveEntry(prev => {
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
            allCategories={allCategories}
            updateAllCategories={setAllCategories}
            category={activeEntry.category}
            onChange={updateActiveEntry}
          />
        </div>

        <div className='stopwatch-group sw-tags'>
          <Tags
            allTags={allTags}
            updateAllTags={setAllTags}
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
              stepSize='5'
              min='0'
              max='100'
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
