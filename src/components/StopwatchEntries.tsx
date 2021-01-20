import React, { useState } from 'react'
import StopwatchEntry from './StopwatchEntry'

interface Data {
  id: number,
  category: string | null,
  description: string | null,
  start_time: Date | null,
  end_time: Date | null,
  intensity: number | null
  pause_start_time: Date | null,
  cumulative_pause_duration: number | null
}

const dummyData: Data = {
  id: 1,
  category: 'waffles',
  description: 'just eating some waffles',
  start_time: new Date(1611021345965),
  end_time: new Date(1611029345965),
  intensity: 90,
  pause_start_time: null,
  cumulative_pause_duration: 0,
};

const records: Data[] = [
  {...dummyData, id: 0,start_time: new Date(1611020000000), end_time: new Date(1611021000000)},
  {...dummyData, id: 1,start_time: new Date(1611022000000), end_time: new Date(1611023000000)},
  {...dummyData, id: 2,start_time: new Date(1611024000000), end_time: new Date(1611025000000)},
  {...dummyData, id: 3,start_time: new Date(1411024000000), end_time: new Date(1411027000000)},
]

const StopwatchEntries = () => {

  const [entries, setEntries] = useState(records);

  const update = (newEntry: any) => {
    console.log('updated entry:', newEntry);
    
    const id = newEntry.id;
    setEntries(entries.map((entry: Data) => {
      if (entry.id === id) {
        return newEntry
      }
      return entry
    }))
  }

  const entriesList = entries.map((entry: Data) => <StopwatchEntry
      key={entry.id}
      id={entry.id}
      category={entry.category}
      description={entry.description}
      start_time={entry.start_time}
      end_time={entry.end_time}
      intensity={entry.intensity}
      cumulative_pause_duration={entry.cumulative_pause_duration}
      onChange={update}
    />
  )

  // console.log('entries:', entries);
  // console.log('entriesList:', entriesList);
  


  return (
    <section className="entries">
      <h4 className="entries__header text--light">Entry</h4>
      <ul className="entries__list">{ entriesList }</ul>
    </section>
  )
}

export default StopwatchEntries;