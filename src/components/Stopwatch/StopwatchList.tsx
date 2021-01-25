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

  const addCategory = (category: ICategory) => {
    return props.updateAllCategories(category).then((id: number | undefined) => {
      if (!id) return;
      setAllCategories((prev: ICategory[]) => {
        return [...prev, { ...category, id}]
      });
    });
  };

  const addTag = (tag: ITag) => {
    return props.addTag(tag).then((id: number | undefined) => {
      if (!id) return;
      setAllTags((prev: ITag[]) => {
        return [...prev, { ...tag, id}]
      });
    });
  };

  const entriesList = Object.values(entries).map((entry: any) => 
    <StopwatchListItem
      key={entry.id}
      id={entry.id}

      allCategories={allCategories}
      updateAllCategories={addCategory}
      allTags={allTags}
      updateAllTags={addTag}
      handleChangeEntryTags={props.updateTags}

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
      <section className="sw-entries">
        <ul className="sw-entries-list">{ entriesList }</ul>
      </section>
    </>
  )
}

export default StopwatchList;
