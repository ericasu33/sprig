import React, { useState } from 'react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import Button from '../Button'
import './DateRangePicker.scss'

export default function DateRange(props) {

  const [value, setValue] = useState([null, null]);
  const {onChange} = props;
  
  const dateIntervalChange = (value, operator = "") => {
    const now = new Date();
    const diffInMs = value[1] - value[0]
    const oneDay = 1000 * 60 * 60 * 24;
    const diffInDays = Math.round(diffInMs / oneDay)
    let start = value[0] && new Date(value[0]);
    let end = value[1] && new Date(value[1]);
    if (operator === "add") {
      start.setDate(start.getDate() + diffInDays);
      end.setDate(end.getDate() + diffInDays)
    } else if (operator === "subtract") {
      start.setDate(start.getDate() - diffInDays);
      end.setDate(end.getDate() - diffInDays)
    } else if (operator === "week") {
      start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
      end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
    } else if (operator === "month") {
      start = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
      end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
    } else if (operator === "year") {
      start = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
      end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
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
      <Button date_range_reset onClick={() => dateIntervalChange(value, 'week')}>Past week</Button>
      <Button date_range_reset onClick={() => dateIntervalChange(value, 'month')}>Past month</Button>
      <Button date_range_reset onClick={() => dateIntervalChange(value, 'year')}>Past year</Button>

    </div>
  );
}