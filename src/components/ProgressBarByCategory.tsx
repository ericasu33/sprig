import React from 'react';
import { useAxiosGet } from '../Hooks/HTTPRequest';
import "./ProgressBar.scss";
import Loader from './Loader';
import ProgressBar from './ProgressBar';
import { totalTimeUsed } from '../helpers/timeDisplay'
import { filterStopwatchData } from '../helpers/displayStopwatchByCatData'


const Bar = ( props : any ) => {
  const url = "http://localhost:8080/api/stopwatches"
  const stopwatches : any = useAxiosGet(url)
  let content = null;
  let sumOfValue: number = 0;

  if (stopwatches.error) {
    content =
      <p>
        There was an error, please refresh or try again later
    </p>
  }

  if (stopwatches.loading) {
    content = <Loader />
  }

  if (stopwatches.data) {

    const aggregateTotalDurationByCategory = (filteredEntries: any) => {
      const entryObj: any = {};
      const result: any = [];


      for (const entry of filteredEntries) {
        const nameColor = entry.name + ',' + entry.color
        if (entryObj[nameColor]) {
          entryObj[nameColor] = entryObj[nameColor] + entry.value;
          sumOfValue += entry.value;
        } else {
          entryObj[nameColor] = entry.value
          sumOfValue += entry.value;
        }
      }

      for (const entry in entryObj) {
        const nameColorArr = entry.split(",")
        result.push({
          name: nameColorArr[0],
          valueInSec: entryObj[entry],
          value: +((entryObj[entry] / sumOfValue * 100).toFixed(2)),
          color: nameColorArr[1]
        })
      }
      return result;
    }
    
  const dataArray : any = aggregateTotalDurationByCategory(filterStopwatchData(stopwatches));

  console.log(dataArray)


    content = dataArray.map((entry : any, key : any) => {
      return (
        
        <ProgressBar
          key={key}
          name={entry.name}
          totalDuration={totalTimeUsed(entry.valueInSec)}
          bgcolor={entry.color}
          completed={entry.value}
        />
      )
    }
    )
        
  }

  return (
    <div>
      {content}
    </div>
  )
};

export default Bar