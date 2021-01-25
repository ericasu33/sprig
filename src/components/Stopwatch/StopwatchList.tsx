import React, { useState } from 'react'
import StopwatchListItem from './StopwatchListItem'

import { IEntry } from 'ts-interfaces/interfaces';

const StopwatchList = (props: any) => {
  
  const entriesList = props.filteredEntries.map((entry: IEntry) => 
    <StopwatchListItem
      key={entry.id}
      allCategories={props.allCategories}
      updateAllCategories={props.updateAllCategories}
      allTags={props.allTags}
      updateAllTags={props.updateAllTags}
      entry={entry}
      updateEntry={props.updateEntry}
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
