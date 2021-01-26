import React, { useEffect, useState } from 'react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import Button from '../Button'
import './DateRangePicker.scss'

export default function MyApp(props) {
  const now = new Date();
  const weekAgoBegin = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 13);
  const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

  const [value, setValue] = useState([weekAgoBegin, todayEnd]);

  useEffect(() => {
    props.onChange('date_range', value)
  }, [value])

  const dateIntervalChange = (operator) => {
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

    </div>
  );
}