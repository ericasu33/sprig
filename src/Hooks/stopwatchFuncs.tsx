import { IEntry } from 'ts-interfaces/interfaces'

// Function to 'UPDATE', 'PLAY', 'CLONE', or 'DELETE' an entry:
const updateEntry = (entry: IEntry, operation: string) => {
  switch (operation) {
    case 'UPDATE':
      // setEntries((prev: IEntry[]) => [...prev, newObj])
      break;
    case 'CLONE':
      // setEntries(allEntries.filter((entry: IEntry) => entry.id !== id))
      break;
    case 'DELETE':
      // setEntries((prev: IEntry[]) => [...prev, prev[id]])
      break;
    case 'PLAY':
      // Function to set an entry as the new Active Entry:
      // const setActiveEntry = (entryObj) => {
        
      //   const activeEntryData: IEntry = {
      //     ...entryObj,
      //     id: null,
      //     start_time: null,
      //     end_time: null,
      //     pause_start_time: null,
      //     cumulative_pause_duration: 0,
      //   };

      // }
      break;
  }

}




