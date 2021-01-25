export function filterStopwatchData (entries: any) {
  const result: any = [];

  for (let entry of entries) {
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
