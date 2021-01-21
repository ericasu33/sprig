import { PieChart } from 'react-minimal-pie-chart';
import { useAxiosGet } from '../Hooks/HTTPRequest';
import Loader from './Loader';

//calculate by category
//based on total time

const PieEntry = ( props : any ) => {
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
    console.log("LOADDDDING")
    content = <Loader />
  }

  if (stopwatches.data) {
    const filterStopwatchData = ( entries : any ) => {
      const result : any = [];

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
            value: Math.floor(entryObj[entry]/sumOfValue * 100),
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