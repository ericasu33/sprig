import React from 'react';
import "./BarChart.scss";
import { ResponsiveBar } from '@nivo/bar';

const formatTimeToStr = (timeInSec: number) => {
  const sec = Math.floor(timeInSec);
  let acc = Math.floor(sec / 60);
  const ss = sec % 60;
  const mm = acc % 60;
  acc = Math.floor(acc / 60);
  const hh = acc;
  return `${hh > 0 ? `${hh}h ` : ""}${mm > 0 ? `${mm}m ` : ""}${ss > 0 ? `${ss}s ` : ""}`;
};

const formatTime = (timeInSec: number, size = Infinity) => {
  const times = [
    {size: 0, key: "sec", val: 60},
    {size: 1, key: "min", val: 60},
    {size: 2, key: "hrs", val: 24},
  ];
  const sec = Math.floor(timeInSec);
  let acc = sec;
  let prev = { ...times[0], val: acc };
  for (const time of times) {
    if (time.size > size) return prev;
    prev = { size: time.size, key: time.key, val: acc };
    acc = acc / time.val;
    if (acc < 1) return prev;
  }
  return prev;
};

const BarChart = ( props : any ) => {
  const stopwatches : any = props.entries || [];

  const formatEntriesToBarChart = (entries: any[]) => {
    const data: any = [];
    const categories: any = [];
    const dataHash: any = {};
    const timeHash: any = {};
    let dataType = "min";
    for (const entry of entries) {
      const date = entry.start_time.toDateString();
      const name = (entry.category && entry.category.value) || "No Category";
      if (!categories.includes(name)) categories.push(name);
      const color = entry.category && entry.category.color;
      const time = (entry.end_time - entry.start_time - entry.cumulative_pause_duration) / 1000;
      if (dataHash[date]) {
        dataHash[date][name] = (dataHash[date][name] || 0) + time / 60;
        timeHash[date][name] = (timeHash[date][name] || 0) + time;
        dataHash[date][`${name}Color`] = `${color || "#000000"}`;
      } else {
        dataHash[date] = {
          date,
          [name]: time / 60,
          [`${name}Color`]: `${color || "#000000"}`,
        };
        timeHash[date] = {
          [name]: time,
        };
      }
    }
    for (const id in dataHash) {
      data.push(dataHash[id]);
    }
    return { data, categories, dataType, timeHash };
  };

  const { data, categories, dataType, timeHash } : any = formatEntriesToBarChart(stopwatches);

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
              legend: `Time (${dataType})`,
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
          labelSkipHeight={16}
          label={d => {
            const seconds = (timeHash[d.indexValue] && timeHash[d.indexValue][d.id]) || 0;
            return formatTimeToStr(seconds);
          }}
          tooltip={d => {
            const seconds = (timeHash[d.indexValue] && timeHash[d.indexValue][d.id]) || 0;
            const time = formatTimeToStr(seconds);
            return <div className="bar-chart tool-tip">{d.id}: {time}</div>;
          }}
        />
    </div>
  )
};
export default BarChart;
