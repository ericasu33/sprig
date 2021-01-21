import { PieChart } from 'react-minimal-pie-chart';
import { useAxiosGet } from '../Hooks/HTTPRequest'
import entries from "./data"

//calculate by category
//based on total time

const PieEntry = ( props : any ) => {
  const url = "http://localhost:8080/api/stopwatches"
  const stopwatches = useAxiosGet(url)

  console.log("HERE", stopwatches.data[0] );
  console.log ("DATA", entries)



  const aggregateTotalDurationByCategory = (entries : any) => {
    const result : any  = {};

    for (const entry of entries) {
      if (result[entry.category_name]) {
        result[entry.category_name] = result[entry.category_name] + entry.total_duration_ms;
      } else {
         result[entry.category_name] = entry.total_duration_ms;
      }
    }

    return result
  }

  console.log(aggregateTotalDurationByCategory(entries)) 

  const defaultLabelStyle = {
    fontSize: '5px',
    fontFamily: 'sans-serif',
    fill: '#FFF'
  };

  const chartData = 
    [
      { title: 'One', value: 10, color: '#E38627' },
      { title: 'Two', value: 15, color: '#C13C37' },
      { title: 'Three', value: 20, color: '#6A2135' },
    ]
    
  const shiftSize = 7;
  const lineWidth = 60;
  

  return (
    <>
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
    </>
  )
}


export default PieEntry