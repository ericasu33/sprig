import { PieChart } from 'react-minimal-pie-chart';
import { useAxiosGet } from '../Hooks/HTTPRequest'

//calculate by category
//based on total time

const PieEntry = ( props : any ) => {
  const url = "http://localhost:8080/api/stopwatches"
  const stopwatches : any = useAxiosGet(url)
  let content = null;

  if (stopwatches.data) {
    content = true;

    const aggregateTotalDurationByCategory = ( entries : any ) => {
    
      const result : any  = {};

      for (let entry of entries.data) {
        for (const [key] of Object.entries(entry)) {
          if (key === "category_name") {
            result.name = entry.category_name
          }

          if (key === "total_duration_ms") {
            result.value = entry.total_duration_ms
          }

          if (key === "category_color") {
            result.color = `#${entry.category_color}`
          }
        }

        if (result.name) {
          result.value = result.value + entry.total_duration_ms;
        } else {
          result.value = entry.total_duration_ms;
        }
      }

      return result
    } 
  
    console.log(aggregateTotalDurationByCategory(stopwatches))
    const pieChartData = [aggregateTotalDurationByCategory(stopwatches)];
    console.log(pieChartData) 
  } 

  const defaultLabelStyle = {
    fontSize: '5px',
    fontFamily: 'sans-serif',
    fill: '#FFF'
  };

  const chartData = pieChartData
    
  const shiftSize = 7;
  const lineWidth = 60;
  

    return (
      <>
      {content && 
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
      </>
    )
  
}


export default PieEntry