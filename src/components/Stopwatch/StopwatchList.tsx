import React, { useState } from 'react'
import StopwatchListItem from './StopwatchListItem'

import { ITag, ICategory, IEntry, IEntries } from 'ts-interfaces/interfaces';

const StopwatchList = (props: any) => {

  const [entries, setEntries] = useState(props.filteredEntries);
  const [allCategories, setAllCategories] = useState(props.allCategories);
  const [allTags, setAllTags] = useState(props.allTags);  
  
  const updateEntry = (newObj: any) => {
    setEntries((prev: IEntries) => ({
        ...prev,
        [newObj.id]: newObj
    }))
  }

  const deleteEntry = (id: number) => {
    setEntries((prev: IEntries) => {
      delete prev[id];
      return {...prev}
    })
  }

  const cloneEntry = (id: number) => {
    setEntries((prev: IEntries) => ({
      ...prev, 
      null: prev[id]
    }))
  }

  const entriesList = Object.values(entries).map((entry: any) => 
    <StopwatchListItem
      key={entry.id}
      id={entry.id}

      allCategories={allCategories}
      updateAllCategories={setAllCategories}
      allTags={allTags}
      updateAllTags={setAllTags}

      category={entry.category}
      tags={entry.tags}
      start_time={entry.start_time}
      end_time={entry.end_time}
      intensity={entry.intensity}
      cumulative_pause_duration={entry.cumulative_pause_duration}
      updateEntry={updateEntry}
      deleteEntry={deleteEntry}
      cloneEntry={cloneEntry}
    />
  )

  return (
    <>
      <h4 className="section-header sw-entries-header">TASK HISTORY</h4>
      <section className="sw-entries">
        <ul className="sw-entries-list">{ entriesList }</ul>
      </section>
    </>
  )
}

export default StopwatchList;
