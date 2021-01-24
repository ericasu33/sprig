import React, { useState } from 'react'
import StopwatchList from './StopwatchList'
// import Charts from './Charts'
import Categories from './Categories'
import Tags from './Tags'
// import DateRange from './DateRangePicker'


import './AnalyzeStopwatch.scss'


const AnalyzeStopwatch = (props: any) => {

  // Update start_time if InputClock is manually adjusted
  const updateEntry = (key: string, value: Date | string | number) => {
    props.updateEntry({
      ...props,
      [key]: value
    })
  };

  

  return (
    <>
      <div className='analytics-filters stopwatch'>
        <div className='stopwatch-group'>
          <Categories 
            allCategories={props.allCategories}
            updateAllCategories={props.updateAllCategories}
            category={props.category}
            onChange={updateEntry}
          />
        </div>
        <div className='stopwatch-group sw-tags'>
          <Tags
            allTags={props.allTags}
            updateAllTags={props.updateAllTags}
            tags={props.tags}
            onChange={updateEntry}
          />
        </div>
        <div>
          date range filter
        </div>
      </div>


      <section className='section-sw-entries'>
        <StopwatchList
          allCategories={props.allCategories}
          allTags={props.allTags}
          filteredEntries={props.filteredEntries}
        />
      </section>

      <section className='section-sw-charts'>
        hi i'm a chart
      </section>

    </>
  )
}

export default AnalyzeStopwatch;
