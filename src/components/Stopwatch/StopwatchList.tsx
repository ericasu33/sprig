import React from 'react'
import StopwatchListItem from './StopwatchListItem'

import { IEntry } from 'ts-interfaces/interfaces';

const StopwatchList = (props: any) => {
  
  const entriesList = props.filteredEntries.map((entry: IEntry) => 
    <StopwatchListItem
      key={entry.id}
      allCategories={props.allCategories}
      createNewCategory={props.createNewCategory}
      updateCategory={props.updateCategory}
      allTags={props.allTags}
      createNewTag={props.createNewTag}
      updateEntryTags={props.updateEntryTags}
      entry={entry}
      updateEntry={props.updateEntry}
    />
  )

  return (
    <>
      <section className="sw-entries">
        
        <div className='sw-header'>
          <div className='sw-header-category'>Categories</div>
          <div className='sw-header-tags'>Tags</div>
          <div className='sw-header-times'>
            <div className='sw-header-times-start'>Start</div>
            <div className='sw-header-times-end'>End</div>
            <div className='sw-header-times-intensity'>Intensity</div>
          </div>
          <div className='sw-header-calcs'>
            <div className='sw-header-calcs-total'>Total</div>
            <div className='sw-header-calcs-effective'>Effective</div>
          </div>
          <div className='sw-header-buttons'></div>
        </div>

        <ul className="sw-entries-list">{ entriesList }</ul>
      </section>
    </>
  )
}

export default StopwatchList;
