import { PieChart } from 'react-minimal-pie-chart';
import './Pie.scss';

const PieEntry = ( props : any ) => {
  const stopwatches : any = props.entries || [];

  const aggregateTotalDurationByCategory = ( filteredEntries : any ) =>  {
    const entryObj : any = {};
    const results : any = [];
    let sum = 0;
    for (const entry of filteredEntries) {
      const name = (entry.category && entry.category.value) || "No_Category";
      const color = (entry.category && entry.category.color) || "#777777";
      if (entryObj[name]) {
        entryObj[name].value += entry.end_time - entry.start_time - entry.cumulative_pause_duration
      } else {
        entryObj[name] = {
          title: name,
          value: entry.end_time - entry.start_time - entry.cumulative_pause_duration,
          color,
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

  const defaultLabelStyle = {
    fontSize: '5px',
    fontFamily: 'sans-serif',
    fill: '#FFF'
  };

  const chartData = aggregateTotalDurationByCategory(stopwatches);
  console.log(chartData);

  const legend = chartData.map((cat: any) => {
    return (
      <div className="pie-legend-item">
        <div className="pie-legend-block" style={{backgroundColor: cat.color}}>
        </div>
        <div className="pie-legend-title">
          {cat.title}
        </div>
      </div>
    );
  })
    
  const shiftSize = 7;
  const lineWidth = 60;

  return (
    <div>
      <div className="pie-chart">
        <PieChart
            data = {chartData}
            style= {{
              width: '300px',
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
        <div className="legend-container">
          {legend}
        </div>
      </div>
    </div>
  )
}


export default PieEntry