import { PieChart } from 'react-minimal-pie-chart';
import Loader from './Loader';
import { totalTimeUsed } from '../helpers/timeDisplay'
import { filterStopwatchData } from '../helpers/displayStopwatchByCatData'

const PieEntry = ( props : any ) => {
  const stopwatches : any = props.dataState;
  let content = null;
  let sumOfValue: number = 0;

  if (!stopwatches) {
    content = <Loader />
  }

  if (stopwatches) {

    const aggregateTotalDurationByCategory = ( filteredEntries : any ) =>  {
      const entryObj : any = {};
      const result : any = [];
      
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
            value: +((entryObj[entry]/sumOfValue * 100).toFixed(2)),
            color: nameColorArr[1]
          })
        }
        return result;
      }

  const defaultLabelStyle = {
    fontSize: '5px',
    fontFamily: 'sans-serif',
    fill: '#FFF'
  };

    const chartData = aggregateTotalDurationByCategory(filterStopwatchData(stopwatches));
    
    const shiftSize = 7;
    const lineWidth = 60;
  
    content = 
        <PieChart
          data = {chartData}
          style= {{
            height: '300px',
            fontFamily: '"Nunito Sans", -apple-system, Helvetica, Arial, sans-serif',
            fontSize: '8px',
          }}
          radius = {PieChart.defaultProps.radius - shiftSize}
          lineWidth = {60}
          segmentsShift={(index) => (index === 0 ? 0.5 : 0.5)}
          label={({ dataEntry }) => dataEntry.value + "%"}
          labelPosition={100 - lineWidth / 2}
          labelStyle={{
            ...defaultLabelStyle,
          }}
        />
  }

  return (
    <div>
      {totalTimeUsed(sumOfValue)}
      {content}
    </div>
  )
}


export default PieEntry