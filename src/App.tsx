import { useEffect, useState } from 'react';
import './App.scss';
import axios from 'axios';
import StopwatchActive from 'components/Stopwatch/StopwatchActive';
import Reports from 'components/Stopwatch/Reports';
import PomodoroTimer from 'components/Pomodoro/PomodoroTimer';
import 'components/Pomodoro/PomodoroTimer';
import { 
  blankActiveEntry,
  activeEntryData,
  allEntriesData 
} from 'hooks/stopwatchData';

import { ISound, ITimer, ICategory, ITag, IEntriesTags, IEntry, IEntryDB } from 'ts-interfaces/interfaces';

function App() {
  const [timerPresets, setTimerPresets]: [ITimer[], Function] = useState([]);
  const [soundFiles, setSoundFiles]: [ISound[], Function] = useState([]);
  const [allCategories, setAllCategories]: [ICategory[], Function] = useState([]);
  const [allTags, setAllTags]: [ITag[], Function] = useState([]);
  const [allEntries, setAllEntries]: [IEntry[], Function] = useState([]);
  const [activeEntry, setActiveEntry]: [IEntry | null, Function] = useState(null);

  const handleAddTimer = (timer: ITimer) => {
    // CREATE (save) new pomodoro timer
    if (timer.id === null) {
      return axios.post(`/api/pomodoro`, timer)
        .then((res: any) => {
          const { data } = res;
          console.log(data);
          setTimerPresets((prev: ITimer[]) => {
            return [ ...prev, { ...timer, id: data.id } ];
          });
          return data.id;
        })
        .catch((err) => {
          console.error(err);
        });
    }
    // UPDATE custom pomodoro timer
    return axios.put(`/api/pomodoro/${timer.id}`, timer)
      .then((res: any) => {
        const { data } = res;
        setTimerPresets((prev: ITimer[]) => {
          return prev.map((t: ITimer) => Number(t.id) === Number(data.id) ? {...timer} : t);
        });
        return data.id;
      })
      .catch((err) => {
        console.error(err);
      });
  };
  
  // const getCategoryObjFromId = (id: number) => {
  //   return allCategories.filter((cat: ICategory) => cat.id === id)
  // }

  // const getTagObjsFromIdArr = (tagIdArr: number[]) => {
  //   return allTags.filter((tag: ITag) => tag.id && tagIdArr.includes(tag.id))
  // }

  const constructAllEntries = (
    entriesDB: IEntryDB[],
    entries_tags: IEntriesTags[],
    allCategories: ICategory[],
    allTags: ITag[]
  ) => {
    const constructTagsObj = (entryId: number) => {
      const tagsObjArr: ITag[] = [];
      entries_tags.map((et: IEntriesTags) => {
        if (et.entry_id = entryId) {
          tagsObjArr.push(allTags[et.tag_id])
        }
      })
    }
    const allEntries = entriesDB.map((entryDB: IEntryDB) => {
      return {
        ...entryDB,
        category: entryDB.category && allCategories.filter((cat: ICategory) => cat.id === entryDB.category),
        tags: entryDB.id && constructTagsObj(entryDB.id)
      }
    })
    setAllEntries(allEntries);
  }

  // const convertFromDBFormat = (dbEntries: IEntry[], allCategories: ICategory[], allTags: ITag[]) => {
  //   return dbEntries.map((dbEntry: IEntry) => {
  //     return {
  //       ...dbEntry,
  //       category: dbEntry.category_id ? getCategoryObjFromId(dbEntry.category_id) : ,
  //       tags: dbEntry.tags ? getTagObjsFromIdArr(dbEntry.tags)
  //     }
  //   })
  // }

  const convertToDBFormat = (entryObj: IEntry) => {
    return {
      ...entryObj,
      category_id: entryObj.category && entryObj.category.id,
      // delete entryObj.tags
    }
  }

  // UPDATE, CLONE, DELETE already-saved stopwatch entry
  const updateEntry = (entryObj: IEntry, instruction: string) => {
    // const inDbFormat = {
    //   category_id: entryObj.category && entryObj.category.id,
    //   start_time: entryObj.start_time,
    //   end_time: entryObj.end_time,
    //   pause_start_time: entryObj.pause_start_time,
    //   cumulative_pause_duration: entryObj.cumulative_pause_duration,
    //   intensity: entryObj.intensity,
    // }
    switch (instruction) {
      case 'UPDATE':
        // post to updateEntries route /:id with entryObj
        // .then update local allEntries state
        setAllEntries(allEntries.map((entry: IEntry) => {
          if (entry.id === entryObj.id) return entryObj
          return entry
        }))
        break;
      case 'CLONE':
        // post to createEntry route, get newEntry.id
        // .then update local allEntries state CHECK SORT ORDER is by start_time
        let sortedAllEntries = []
        for (let i=0; i < allEntries.length; i++) {
          sortedAllEntries.push(allEntries[i])
          if (allEntries[i].id === entryObj.id) {
            sortedAllEntries.push(entryObj)
          }
        }
        setAllEntries(sortedAllEntries)
        break;
      case 'DELETE':
        // missing delete route?
        // post to deleteEntry route /:id
        // update local allEntries state
        setAllEntries(allEntries.filter((entry: IEntry) => entry.id !== entryObj.id))
        break;
      case 'PLAY': // no axios call, just local
        setActiveEntry({
          ...entryObj,
          start_time: null,
          end_time: null,
          pause_start_time: null,
          cumulative_pause_duration: 0,
        });
    }
  }  
  
  const saveNewEntry = (entryObj: IEntry) => {
    const inDbFormat = {
      category_id: entryObj.category && entryObj.category.id,
      start_time: entryObj.start_time,
      end_time: entryObj.end_time,
      pause_start_time: entryObj.pause_start_time,
      cumulative_pause_duration: entryObj.cumulative_pause_duration,
      intensity: entryObj.intensity,
    }
    axios.post<IEntry>(`/api/stopwatches/${entryObj.id}`, inDbFormat)
      .then(res => {
        axios.get<IEntry[]>(`/api/stopwatches`)
      })
      .then((res: any) => {
        setAllEntries(res.data);
      })
  }

  useEffect(() => {
    Promise.all([
      axios.get<ITimer[]>(`/api/pomodoro`),
      axios.get<ISound[]>(`/api/sound`),
      axios.get<ICategory[]>(`/api/category`),
      axios.get<ITag[]>(`/api/tag`),
      axios.get<IEntryDB[]>(`/api/stopwatches`),
      axios.get<IEntriesTags[]>(`/api/stopwatches/entries_tags`),
    ])
      .then((all) => {
        const [pomodoros, sounds, categories, tags, entries, entries_tags] = all;
        console.log(pomodoros.data);
        setTimerPresets(pomodoros.data);
        setSoundFiles(sounds.data);
        setAllCategories(categories.data);
        setAllTags(tags.data);
        // setAllEntries(entries.data);
        constructAllEntries(entries.data, entries_tags.data, categories.data, tags.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <main>
      <nav className='nav-container'>
        <div className='nav-logo-container'>
          <div className='nav-logo-inner'>
            <div className='nav-title'>TRACK<br/>SUITE</div>
          </div>
          <div className='nav-logo-inner'>
            <img src="./assets/suit.png" alt="suit"/>
          </div>
        </div>
      </nav>
      <section className='main-app'>
        <section className='section-pm'>
          <PomodoroTimer 
            timers={timerPresets}
            saveTimer={handleAddTimer}
            sounds={soundFiles}
          />
        </section>
        <section className='section-sw-active'>
          <StopwatchActive
            allCategories={allCategories}
            updateAllCategories={console.log('app.tsx runs update all categories')}
            allTags={allTags}
            updateAllTags={console.log('app.tsx runs update all tags')}
            blankActiveEntry={blankActiveEntry}
            activeEntry={activeEntry}
            saveNewEntry={saveNewEntry}
          />
        </section>
        <section className='section-analytics'>
          <Reports
            allCategories={allCategories}
            updateAllCategories={() => console.log('app.tsx runs update all categories')}
            allTags={allTags}
            updateAllTags={() => console.log('app.tsx runs update all tags')}
            allEntries={allEntries}
            updateEntry={updateEntry} 
          />
        </section>
      </section>
    </main>
  );
}

export default App;
