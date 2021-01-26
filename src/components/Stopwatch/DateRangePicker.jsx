<<<<<<< HEAD:src/components/Stopwatch/DateRangePicker.jsx
import React, { useEffect, useState } from 'react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import Button from '../Button'
import './DateRangePicker.scss'

export default function MyApp(props) {
=======
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import Button from './Button'
import Bar from './ProgressBarByCategory'
import PieEntry from './Pie';
import './DateRangePicker.scss'

export default function DateRange() {
  const [dataByDateRange, setDataByDateRange] = useState([])
  const url = "http://localhost:8080/api/stopwatches"

  useEffect(() => {
    axios.get(url)
      .then(res => {
        setDataByDateRange(res.data);
      })
      .catch(err => console.log(err))
  }, [url])

>>>>>>> origin/feature/visualization/all:src/components/DateRangePicker.jsx
  const now = new Date();
  const weekAgoBegin = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 13);
  const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

  const [value, setValue] = useState([weekAgoBegin, todayEnd]);

<<<<<<< HEAD:src/components/Stopwatch/DateRangePicker.jsx
  useEffect(() => {
    props.onChange('date_range', value)
  }, [value])

  const dateIntervalChange = (operator) => {
=======
  const result = []
  
  for (const entry of dataByDateRange) {
    const startDate = new Date(entry.start_time);
    const endDate = new Date(entry.end_time);

    if (startDate >= value[0] && endDate <= value[1]) {
      result.push(entry)
    }
  }

  const dateIntervalChange = (value, onChange, operator) => {
>>>>>>> origin/feature/visualization/all:src/components/DateRangePicker.jsx
    if (value) {
      const diffInMs = value[1] - value[0]
      const oneDay = 1000 * 60 * 60 * 24;
      const diffInDays = Math.round(diffInMs / oneDay)
    
      if (operator === "add") {
        const start = new Date(value[0]);
        const end = new Date(value[1]);

        start.setDate(start.getDate() + diffInDays);
        end.setDate(end.getDate() + diffInDays)

        setValue([start, end])
      }

      if (operator === "subtract") {
        const start = new Date(value[0]);
        const end = new Date(value[1]);

        start.setDate(start.getDate() - diffInDays);
        end.setDate(end.getDate() - diffInDays)
        
        setValue([start, end])
      }
    }
  }
  
  return (
<<<<<<< HEAD:src/components/Stopwatch/DateRangePicker.jsx
    <div className="calendar-container">
      <Button date_range_left onClick={() => dateIntervalChange('subtract')} />
      
      <DateRangePicker
        className='date-range-picker'
        onChange={setValue}
        value={value}
        locale='en-CA'
        calendarIcon={<i className='far fa-calendar-alt'></i>}
      />

      <Button date_range_right onClick={e => dateIntervalChange('add')} />
      <Button date_range_reset onClick={() => setValue([weekAgoBegin, todayEnd])} />
=======
    <div>
      <div className="calendar-container">
        <Button 
          onClick={() => dateIntervalChange(value, onChange,"subtract")}
          date_range
        >
          <i className="fas fa-chevron-left"></i>
        </Button>
        
        <DateRangePicker
          onChange={onChange}
          value={value}
          clearIcon={null}
        />

        <Button
          onClick={() => onChange([yesterdayBegin, todayEnd])}
          date_range_reset
        >
          <i class="fas fa-undo"></i>
        </Button>

        <Button 
          onClick={e => dateIntervalChange(value, onChange, "add")}
          date_range
        >
          <i className="fas fa-chevron-right"></i>
        </Button>
      </div>
>>>>>>> origin/feature/visualization/all:src/components/DateRangePicker.jsx

      <Bar
        dataState={result}
      />

      <PieEntry
        dataState={result}
      />
    </div>
  );
}