import React from 'react';
import "./ProgressBar.scss";
import Loader from '../Loader';
import ProgressBar from './ProgressBar';
import { totalTimeUsed } from '../../helpers/timeDisplay'
import { filterStopwatchData } from '../../helpers/displayStopwatchByCatData'


const Bar = ( props : any ) => {
  const stopwatches : any = props.entries;
  let content = null;

  const aggregateTotalDurationByCategory = ( filteredEntries : any ) =>  {
    const entryObj : any = {};
    const results : any = [];
    let sum = 0;
    for (const entry of filteredEntries) {
      if (entryObj[entry.category.id]) {
        entryObj[entry.category.id].value += entry.end_time - entry.start_time - entry.cumulative_pause_duration
      } else {
        entryObj[entry.category.id] = {
          title: entry.category.value,
          value: entry.end_time - entry.start_time - entry.cumulative_pause_duration,
          color: entry.category.color,
        };
      }
      sum += entry.end_time - entry.start_time - entry.cumulative_pause_duration;
    }
    for (const id in entryObj) {
      results.push({
        ...entryObj[id],
        value: Number((entryObj[id].value/sum * 100).toFixed(2)),
      });
    }
    return results;
  }

  if (stopwatches) {
    const dataArray : any = aggregateTotalDurationByCategory(stopwatches);

    

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
    });
  }

  return (
    <div>
      {content}
    </div>
  )
};

export default Bar