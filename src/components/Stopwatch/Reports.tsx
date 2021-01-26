import React, { useEffect, useState } from 'react'
import StopwatchList from './StopwatchList'
import Pie from './Pie'
import ProgressBar from './ProgressBar'
import Categories from './Categories'
import Tags from './Tags'
import DateRange from './DateRangePicker'
import { IFilterOptions } from 'ts-interfaces/interfaces'
import filterData from 'helpers/filterData'


import './Reports.scss'

const blankFilter: IFilterOptions = {
  category: null,
  tags: null,
  date_range: null,
}

const Reports = (props: any) => {
  const [filterOptions, setFilterOptions] = useState(blankFilter)
  const [filteredEntries, setFilteredEntries] = useState([])
  const [tab, setTab] = useState('data');

  useEffect(() => {
    props.allEntries && setFilteredEntries(filterData(props.allEntries, filterOptions))
  }, [filterOptions, props.allEntries]);
  
  // Update filter options when new category, tag or date_range is selected
  const updateFilterOptions = (key: string, value: Date | string | number) => {
    setFilterOptions({
      ...filterOptions,
      [key]: value
    })
    props.allEntries && setFilteredEntries(filterData(props.allEntries, filterOptions))
  };


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
              createNewCategory={props.createNewCategory}
              category={props.category}
              onChange={updateFilterOptions}
              readOnly
            />
          </div>
          <div className='stopwatch-group sw-tags'>
            <Tags
              allTags={props.allTags}
              createNewTag={props.createNewTag}
              tags={props.tags}
              onChange={updateFilterOptions}
              readOnly
            />
          </div>
          <div>
            <DateRange
              onChange={updateFilterOptions}
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
            createNewCategory={props.createNewCategory}
            allTags={props.allTags}
            updateAllTags={props.updateAllTags}
            filteredEntries={filteredEntries}
            updateEntry={props.updateEntry}
            createNewTag={props.createNewTag}
            updateEntryTags={props.updateEntryTags}
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
