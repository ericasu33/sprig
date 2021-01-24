import React, { useState } from 'react'
import StopwatchList from './StopwatchList'
import Pie from './Pie'
import ProgressBar from './ProgressBar'
import Categories from './Categories'
import Tags from './Tags'
import DateRange from './DateRangePicker'


import './Reports.scss'

const blankFilter = {
  category: '',
  tags: [],
  date_range: []
}

const Reports = (props: any) => {
  const [filterOptions, setFilterOptions] = useState(blankFilter)
  const [tab, setTab] = useState('data');

  // Update start_time if InputClock is manually adjusted
  const updateFilterOptions = (key: string, value: Date | string | number) => {
    setFilterOptions({
      ...props,
      [key]: value
    })
  };

  // allEntries.filter(() => filterFunction())


  return (
    <>
      <div className='analytics-filters stopwatch'>
        <div className='analytics-filters-title'>
          <div className='stopwatch-group'>
            <div>APPLY FILTERS</div>
          </div>
        </div>
        <div className='analytics-filters-selectors'>
          <div className='stopwatch-group'>
            <Categories 
              allCategories={props.allCategories}
              updateAllCategories={props.updateAllCategories}
              category={props.category}
              updateFilterOptions={updateFilterOptions}
            />
          </div>
          <div className='stopwatch-group sw-tags'>
            <Tags
              allTags={props.allTags}
              updateAllTags={props.updateAllTags}
              tags={props.tags}
              updateFilterOptions={updateFilterOptions}
            />
          </div>
          <div>
            <DateRange
              updateFilterOptions={updateFilterOptions}
            />
          </div>
        </div>
      </div>

      <div className='analytics-tabs-container'>
        <div 
          onClick={() => setTab('data')}
          className={`analytics-tab ${tab === 'data' && 'analytics-tab-selected'}`}
        >
          DATA
        </div>
        <div 
          onClick={() => setTab('charts')}
          className={`analytics-tab ${tab === 'charts' && 'analytics-tab-selected'}`}
        >
          CHARTS
        </div>
      </div>
      {tab === 'data' &&
        <section className='section-sw-entries'>
          <StopwatchList
            allCategories={props.allCategories}
            allTags={props.allTags}
            filteredEntries={props.allEntries}
          />
        </section>
      }

      {tab === 'charts' &&
        <section className='section-sw-charts'>
          <ProgressBar />
          <Pie />
        </section>
      }

    </>
  )
}

export default Reports;
