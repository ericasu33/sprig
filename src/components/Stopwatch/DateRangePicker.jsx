import React, { useState } from 'react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import Button from '../Button'
import './DateRangePicker.scss'

export default function MyApp() {
  const now = new Date();
  const weekAgoBegin = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 13);
  const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

  const [value, onChange] = useState([weekAgoBegin, todayEnd]);

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
    <div className="calendar-container">
      <Button 
        onClick={() => dateIntervalChange(value, onChange, "subtract")}
        date_range_left
      />
      
      <DateRangePicker
        className='date-range-picker'
        onChange={onChange}
        value={value}
        locale='en-AU'
        calendarIcon={<i className='far fa-calendar-alt'></i>}
      />

      <Button
        onClick={() => onChange([weekAgoBegin, todayEnd])}
        date_range_reset
      />

      <Button 
        onClick={e => dateIntervalChange(value, onChange, "add")}
        date_range_right
      />

    </div>
  );
}