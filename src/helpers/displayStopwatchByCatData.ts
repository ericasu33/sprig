export function filterStopwatchData (entries: any) {

  const result = entries.map((entry: any) => {
    return {
      name: entry.category_name,
      value: entry.end_date - entry.start_date - entry.cumulative_pause_duration,
      color: entry.category_color,
    };
  });
  
  return result
} 
