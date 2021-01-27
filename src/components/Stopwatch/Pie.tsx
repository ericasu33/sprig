import { PieChart } from 'react-minimal-pie-chart';

const PieEntry = ( props : any ) => {
  const stopwatches : any = props.entries;
  let content = null;

  if (stopwatches) {

    const aggregateTotalDurationByCategory = ( filteredEntries : any ) =>  {
      const entryObj : any = {};
      const results : any = [];
      let sum = 0;
      for (const entry of filteredEntries) {
        const name = entry.category.value || "No_Category";
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
      console.log(results);
      return results;
    }

  const defaultLabelStyle = {
    fontSize: '5px',
    fontFamily: 'sans-serif',
    fill: '#FFF'
  };

    const chartData = aggregateTotalDurationByCategory(stopwatches);
    
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
      {content}
    </div>
  )
}


export default PieEntry