import React, { useState } from 'react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import Button from '../Button'
import './DateRangePicker.scss'

export default function DateRange(props) {
  const now = new Date();
  const sevenDaysAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
  const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
  const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
  const lastSunday = new Date(now.setDate(now.getDate() - now.getDay()));
  const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

  const [value, setValue] = useState();
  const {onChange} = props;
  
  const dateIntervalChange = (value, operator = "") => {
    const diffInMs = value[1] - value[0]
    const oneDay = 1000 * 60 * 60 * 24;
    const diffInDays = Math.round(diffInMs / oneDay)
    let start = value[0] && new Date(value[0]);
    let end = value[1] && new Date(value[1]);
    if (!start || !end) {
      setValue([start, end]);
      onChange("date_range",[start, end]);
      return;
    } else if (operator === "add") {
      start.setDate(start.getDate() + diffInDays);
      end.setDate(end.getDate() + diffInDays)
    } else if (operator === "subtract") {
      start.setDate(start.getDate() - diffInDays);
      end.setDate(end.getDate() - diffInDays)
    }
    setValue([start, end]);
    onChange("date_range",[start, end]);
  }
  
  return (
    <div className="calendar-container">
      <Button date_range_left onClick={() => dateIntervalChange(value, 'subtract')} />
      
      <DateRangePicker
        className='date-range-picker'
        onChange={dateIntervalChange}
        value={value}
        locale='en-CA'
        clearIcon={null}
        calendarIcon={<i className='far fa-calendar-alt' />}
      />

      <Button date_range_right onClick={e => dateIntervalChange(value, 'add')} />
      <Button date_range_reset onClick={() => dateIntervalChange([null,null])}>Clear</Button>
      <Button date_range_reset onClick={() => dateIntervalChange([sevenDaysAgo, todayEnd])}>Past week</Button>
      <Button date_range_reset onClick={() => dateIntervalChange([oneMonthAgo, todayEnd])}>Past month</Button>
      <Button date_range_reset onClick={() => dateIntervalChange([oneYearAgo, todayEnd])}>Past year</Button>

    </div>
  );
}