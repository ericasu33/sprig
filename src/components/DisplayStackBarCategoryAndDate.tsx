import { useAxiosGet } from '../Hooks/HTTPRequestStopwatch';
import { filterStopwatchData } from '../helpers/displayStopwatchByCatData'
import StackBar from './StackBar'

const StackBarEntry = (props : any) => {
  const url = "http://localhost:8080/api/stopwatches"

  const stopwatches : any = useAxiosGet(url)
  let content = null;
  let sumOfValue: number = 0;


  if (stopwatches.error) {
    content =
      <p>
        There was an error, please refresh or try again later
      </p>
  }

// if (stopwatches.loading) {
//   console.log("LOADDDDING")
//   content = <Loader />
// }

  if (stopwatches.data) {
  
    const aggregateTotalDurationByCategory = (filteredEntries: any) => {
      const entryObj: any = {};
      const result: any = [];


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
          value: +((entryObj[entry] / sumOfValue * 100).toFixed(2)),
          color: nameColorArr[1]
        })
      }
      return result;
    }

    console.log(stopwatches.data)

    // console.log(filterStopwatchData(stopwatches))

    content =
      <StackBar
      />
  }

  return (
    <div>
      {content}
    </div>
  )
}

export default StackBarEntry;

