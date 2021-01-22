import React from 'react';
import { useAxiosGet } from '../Hooks/HTTPRequest';
import "./ProgressBar.scss";
import Loader from './Loader';
import ProgressBar from './ProgressBar';



const Bar = ( props : any ) => {
  const url = "http://localhost:8080/api/stopwatches"
  const stopwatches : any = useAxiosGet(url)
  let content = null;
  let sumOfValue: number = 0;

  const totalTimeUsed = (seconds: number) => {
    const hour = Math.floor(seconds % (3600 * 24) / 3600);
    const minute = Math.floor(seconds % 3600 / 60);
    const second = Math.floor(seconds % 60);

    return `${hour} : ${minute} : ${second}`
  }

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

    const filterStopwatchData = (entries: any) => {
      const result: any = [];

      for (let entry of entries.data) {
        const entryObj: any = {};

        for (const [key] of Object.entries(entry)) {
          if (key === "category_name") {
            entryObj.name = entry.category_name
          }

          if (key === "total_duration_ms") {
            entryObj.value = entry.total_duration_ms
          }

          if (key === "category_color") {
            entryObj.color = `#${entry.category_color}`
          }
        }
        result.push(entryObj);
      }
      return result
    }

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