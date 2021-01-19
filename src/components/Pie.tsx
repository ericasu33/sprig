import { PieChart } from 'react-minimal-pie-chart';
import axios from 'axios';
import { useAxiosGet } from '../Hooks/HTTPRequest'

//calculate by category
//based on total time

const PieEntry = (props: any) => {
  const url = "http://localhost:8080/api/stopwatches"
  const stopwatches = useAxiosGet(url)

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
  console.log("HERE", stopwatches );

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