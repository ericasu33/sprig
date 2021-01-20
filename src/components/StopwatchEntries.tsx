import React, { useState } from 'react'
import StopwatchEntry from './StopwatchEntry'

interface Tag {
  id: number,
  tag: string | null
}

interface Category {
  id: number,
  name: string | null,
  color: string | null
}

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

interface Entries {
  [key: string]: Data
}

const dummyData: Data = {
  id: 1,
  category: {id: 0, name: 'waffles', color: '#efefef'},
  tags: [{id: 0, tag: 'food'}, {id: 1, tag: 'dessert'}],
  description: 'just eating some waffles',
  start_time: new Date(1611021345965),
  end_time: new Date(1611029345965),
  intensity: 90,
  pause_start_time: null,
  cumulative_pause_duration: 0,
};

const dummyEntries: Entries = {
  '0': {...dummyData, id: 0, start_time: new Date(1611020000000), end_time: new Date(1611021000000)},
  '1': {...dummyData, id: 1, start_time: new Date(1611022000000), end_time: new Date(1611023000000)},
  '2': {...dummyData, id: 2, start_time: new Date(1611024000000), end_time: new Date(1611025000000)},
  '3': {...dummyData, id: 3, start_time: new Date(1411024000000), end_time: new Date(1411027000000)},
}

const StopwatchEntries = () => {

  const [entries, setEntries] = useState(dummyEntries);

  const update = (newEntry: any) => {
    console.log('updated entry:', newEntry);
    setEntries(prev => {
      return {
        ...prev,
        [newEntry.id]: newEntry
      }
    })
  }

  const entriesList = Object.values(entries).map((entry: Data) => <StopwatchEntry
      key={entry.id}
      id={entry.id}
      category={entry.category}
      tags={entry.tags}
      description={entry.description}
      start_time={entry.start_time}
      end_time={entry.end_time}
      intensity={entry.intensity}
      cumulative_pause_duration={entry.cumulative_pause_duration}
      onChange={update}
    />
  )

  return (
    <section className="entries">
      <h4 className="entries__header text--light">Entry</h4>
      <ul className="entries__list">{ entriesList }</ul>
    </section>
  )
}

export default StopwatchEntries;