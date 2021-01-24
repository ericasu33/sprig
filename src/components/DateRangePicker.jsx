import React, { useState } from 'react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import './DateRangePicker.scss'

export default function MyApp() {
  const now = new Date();
  const yesterdayBegin = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
  const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

  const [value, onChange] = useState([yesterdayBegin, todayEnd]);

  console.log(value)
  const diffInMs = value[1] - value[0]

  console.log(diffInMs)

  const oneDay = 1000 * 60 * 60 * 24;

  const diffInDays = Math.round(diffInMs/oneDay)

  console.log(diffInDays)

  const test = new Date(value[0])
  console.log("HERE", test)

  const dateIntervalChange = (value, diffInDays, operator) => {
    console.log("IT FIRED")
    
    if (operator === "add") {
      const start = new Date(value[0]);
      const end = new Date(value[1]);

      start.setDate(start.getDate() + diffInDays);
      end.setDate(end.getDate() + diffInDays)

      onChange([start, end])
    }

    if (operator === "subtract") {
      const result = new Date(value);
      result.setDate(result.getDate() - diffInDays);
      return result
    }
    
  }
  
  return (
    <div className="calendar-container">
      <button 
        onClick={e => console.log("Clicked")}
        className="arrow"
      >
        <i onClick={e => console.log("Clicked")} className="fas fa-chevron-left"></i>
      </button>
      
      <DateRangePicker
        onChange={onChange}
        value={value}
        clearIcon={null}
      />

      <button 
        onClick={e => console.log("Clicked")}
        className="arrow"
      >
        <i className="fas fa-chevron-right"></i>
      </button>

    </div>
  );
}