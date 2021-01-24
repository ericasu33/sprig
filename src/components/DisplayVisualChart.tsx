import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DateRange from './DateRangePicker'
import Bar from './ProgressBarByCategory'
import PieEntry from './Pie';


const DisplayVisualChart = () => {
  const [dataByDateRange, setDataByDateRange] = useState("")
  const url = "http://localhost:8080/api/stopwatches"

  useEffect(() => {
  axios.get(url)
    .then(res => {
      setDataByDateRange(res.data);
    })
    .catch(err => console.log(err))
  }, [url])

    console.log(dataByDateRange)
    
  return (
    <div>
      <DateRange
        data={dataByDateRange}
        change={setDataByDateRange}
      />
    </div>
  );
};

export default DisplayVisualChart;