import React, { useEffect, useState } from 'react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import Button from '../Button'
import './DateRangePicker.scss'

export default function MyApp(props) {
  const now = new Date();
  const sevenDaysAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6);
  const oneMonthAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 28);
  const oneYearAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 365);
  const lastSunday = new Date(now.setDate(now.getDate() - now.getDay()));
  const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

  const [value, setValue] = useState();

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
      <Button date_range_reset onClick={() => setValue([sevenDaysAgo, todayEnd])}>Past week</Button>
      <Button date_range_reset onClick={() => setValue([oneMonthAgo, todayEnd])}>Past month</Button>
      <Button date_range_reset onClick={() => setValue([oneYearAgo, todayEnd])}>Past year</Button>

    </div>
  );
}