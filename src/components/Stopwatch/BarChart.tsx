import React from 'react';
import "./BarChart.scss";
import { ResponsiveBar } from '@nivo/bar';
import { IEntry } from 'ts-interfaces/interfaces';


const BarChart = ( props : any ) => {
  const stopwatches : any = props.entries || [];

  const formatEntriesToBarChart = (entries: any[]) => {
    const data: any = [];
    const categories: any = [];
    const dataHash: any = {};
    console.log(entries);
    for (const entry of entries) {
      const date = entry.start_time.getDate();
      const name = entry.category.value || "No Category";
      if (!categories.includes(name)) categories.push(name);
      const color = entry.category && entry.category.color;
      if (dataHash[date]) {
        dataHash[date][name] = entry.end_time - entry.start_time - entry.cumulative_pause_duration;
        dataHash[date][`${name}Color`] = `${color || "#000000"}`;
      } else {
        dataHash[date] = {
          date,
          [name]: entry.end_time - entry.start_time - entry.cumulative_pause_duration,
          [`${name}Color`]: `${color || "#000000"}`,
        };
      }
    }
    for (const id in dataHash) {
      data.push(dataHash[id]);
    }
    return { data, categories };
  };

  const { data, categories } : any = formatEntriesToBarChart(stopwatches);

  return (
    <div className="entry-bar-chart">
      <ResponsiveBar 
          data={data}
          indexBy={"date"}
          keys={categories}
          margin={{ top: 50, right: 130, bottom: 50, left: 100 }}
          padding={0.3}
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Date',
              legendPosition: 'middle',
              legendOffset: 32
          }}
          axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Time',
              legendPosition: 'middle',
              legendOffset: -80
          }}
          legends={[
              {
                  dataFrom: 'keys',
                  anchor: 'bottom-right',
                  direction: 'column',
                  justify: false,
                  translateX: 120,
                  translateY: 0,
                  itemsSpacing: 2,
                  itemWidth: 100,
                  itemHeight: 20,
                  itemDirection: 'left-to-right',
                  itemOpacity: 0.85,
                  symbolSize: 20,
                  effects: [
                      {
                          on: 'hover',
                          style: {
                              itemOpacity: 1
                          }
                      }
                  ]
              }
          ]}
          animate={true}
          motionStiffness={90}
          motionDamping={15}
        />
    </div>
  )
};
export default BarChart;
