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

  const now = new Date();
  const yesterdayBegin = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
  const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

  const [value, onChange] = useState([yesterdayBegin, todayEnd]);

  const result = []
  
  for (const entry of dataByDateRange) {
    const startDate = new Date(entry.start_time);
    const endDate = new Date(entry.end_time);

    if (startDate >= value[0] && endDate <= value[1]) {
      result.push(entry)
    }
  }

  const dateIntervalChange = (value, onChange, operator) => {
    if (value) {
      const diffInMs = value[1] - value[0]
      const oneDay = 1000 * 60 * 60 * 24;
      const diffInDays = Math.round(diffInMs / oneDay)
    
      if (operator === "add") {
        const start = new Date(value[0]);
        const end = new Date(value[1]);

        start.setDate(start.getDate() + diffInDays);
        end.setDate(end.getDate() + diffInDays)

        onChange([start, end])
      }

      if (operator === "subtract") {
        const start = new Date(value[0]);
        const end = new Date(value[1]);

        start.setDate(start.getDate() - diffInDays);
        end.setDate(end.getDate() - diffInDays)
        
        onChange([start, end])
      }
    }
  }
  
  return (
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

      <Bar
        dataState={result}
      />

      <PieEntry
        dataState={result}
      />
    </div>
  );
}