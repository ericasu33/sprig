import React, { useState, useEffect } from 'react';
import Button from './Button';
import Categories from './Categories';
import Tags from './Tags';
import StepInputClock from './StepInputClock'
import StepInputInt from './StepInputInt'
import StopwatchTime from './StopwatchTime';
import 'react-calendar/dist/Calendar.css';
import './Stopwatch.scss'

interface Tag {
  id: number | null,
  label: string | null,
  value?: string,
  color: string | null
}

interface Category {
  id: number | null,
  label: string | null,
  value?: string,
  color: string | null
}

interface Data {
  id: number,
  category: Category | null,
  tags: Tag[] | null,
  start_time: Date | null,
  end_time: Date | null,
  intensity: number | null
  pause_start_time: Date | null,
  cumulative_pause_duration: number | null
}

const dummyCategories: Category[] = [
  {id: 0, label: 'waffles', value: 'waffles', color: '#efefef'},
  {id: 1, label: 'pancakes', value: 'pancakes', color: '#efefef'},
  {id: 2, label: 'sneezing', value: 'sneezing', color: '#efefef'},
]

const dummyTags: Tag[] = [
  {id: 0, label: 'food', value: 'food', color: '#ee0'},
  {id: 1, label: 'dessert', value: 'dessert', color: '#e0e'},
  {id: 2, label: 'icecream', value: 'icecream', color: '#e0e'},
]

const dummyNewTime: Data = {
  id: 0,
  category: null,
  tags: null,
  start_time: null,
  end_time: null,
  intensity: 100,
  pause_start_time: null,
  cumulative_pause_duration: 0,
};

const dummyContinueEntry: Data = {
  id: 1,
  category: dummyCategories[1],
  tags: [dummyTags[0], dummyTags[1]],
  start_time: new Date(1611021345965),
  end_time: null,
  intensity: 90,
  pause_start_time: null,
  cumulative_pause_duration: 60000,
};

const incomingData: Data = dummyNewTime

const StopwatchActive = () => {
  const [allCategories, setAllCategories] = useState(dummyCategories);
  const [allTags, setAllTags] = useState(dummyTags);
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [activeEntry, setActiveEntry] = useState(incomingData);

  console.log('activeEntry:', activeEntry);
  
  // useEffect(() => {
  //   if (activeEntry.id) {
  //     setIsTimerRunning(true)
  //   }
  // }, [])

  useEffect(() => {
    // updateDatabase(activeEntry)
    if (activeEntry.end_time) {
      console.log('SAVED ENTRY:', activeEntry);
      setActiveEntry({...dummyNewTime})
    }
  }, [activeEntry])

  // Update start_time if InputClock is manually adjusted
  const updateActiveEntry = (key: string, value: Date | number | null | Category | Tag) => {
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
    <div className='stopwatch'>

      <div className='stopwatch-group sw-categories'>
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


      {/* <StartEndTime />  */}
      <div className='clock-start-time'>
        {activeEntry.start_time &&
          <StepInputClock
            label='Start Time'
            name='start_time'
            time={activeEntry.start_time}
            onChange={updateActiveEntry}
            allowFuture='false'
          />}
        </div>

      {/* <Intensity /> */}
      <div className='stopwatch-input-int'>
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

      <StopwatchTime
        activeEntry={activeEntry}
        isTimerRunning={isTimerRunning}
      />

      {!isTimerRunning &&
        <Button play onClick={(e: any) => handleTimerState("PLAY")}>
          <i className="far fa-play-circle"></i>
        </Button>
      }

      {isTimerRunning &&
        <Button pause onClick={(e: any) => handleTimerState("PAUSE")}>
          <i className="far fa-pause-circle"></i>
        </Button>
      }

      {activeEntry.start_time &&
        <Button stop onClick={(e: any) => handleTimerState("SAVE")}>
          <i className="far fa-save"></i>
        </Button>
      }
    </div>
  )
}

export default StopwatchActive;
