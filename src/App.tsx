import { useEffect, useState } from 'react';
import './App.scss';
import axios from 'axios';
import StopwatchActive from 'components/Stopwatch/StopwatchActive';
import Reports from 'components/Stopwatch/Reports';
import PomodoroTimer from 'components/Pomodoro/PomodoroTimer';
import 'components/Pomodoro/PomodoroTimer';

import { ISound, ITimer, ICategoryDB, ICategory, ITagDB, ITag, IEntriesTags, IEntry, IEntryDB } from 'ts-interfaces/interfaces';

function App() {
  const [timerPresets, setTimerPresets]: [ITimer[], Function] = useState([]);
  const [soundFiles, setSoundFiles]: [ISound[], Function] = useState([]);
  const [allCategories, setAllCategories]: [ICategory[], Function] = useState([]);
  const [allTags, setAllTags]: [ITag[], Function] = useState([]);
  const [allEntries, setAllEntries]: [IEntry[], Function] = useState([]);
  const [activeEntry, setActiveEntry]: [IEntry | null, Function] = useState(null);

  // Handle pomodoro timer CREATE and UPDATE
  const handleAddTimer = (timer: ITimer) => {
    // CREATE (save) new pomodoro timer
    let promise;
    if (timer.id === null) {
      promise = axios.post(`/api/pomodoro`, timer)
        .then((res: any) => {
          const { data } = res;
          setTimerPresets((prev: ITimer[]) => {
            return [ ...prev, { ...timer, id: data.id } ];
          });
          return data.id;
        });

    // UPDATE custom pomodoro timer
    } else {
      promise = axios.put(`/api/pomodoro/${timer.id}`, timer)
        .then((res: any) => {
          const { data } = res;
          setTimerPresets((prev: ITimer[]) => {
            return prev.map((t: ITimer) => Number(t.id) === Number(data.id) ? {...timer} : t);
          });
          return data.id;
        });
    }
    return promise.catch((err) => {
      console.error(err);
    });
  };

  // Handle Category CREATE
  const handleCreateNewCategory = (category: ICategory) => {
    return axios.post(`/api/category`, category)
      .then((res) => {
      return res.data.id;
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // Handle Tag CREATE
  const handleCreateNewTag = (tag: ITag) => {
    return axios.post(`/api/tag`, tag)
      .then((res) => {
        return res.data.id;
      })
      .catch((err) => {
        console.error(err);
      });
  };
  
    // Change format from local to DB
  const reformatTagsToDB = (tagObj: ITag[]) => {
    // setAllTags(tags.map((tag: ITag) => ({ id: tag.id, label: tag.tag, value: tag.tag})))
  }
  const convertEntryToDBFormat = (entryObj: IEntry) => {
    return ({
      id: entryObj.id,
      category: entryObj.category && entryObj.category.id,
      start_time: entryObj.start_time,
      end_time: entryObj.end_time,
      intensity: Math.floor(Number(entryObj.intensity) / 100),
      pause_start_time: entryObj.pause_start_time,
      cumulative_pause_duration: entryObj.cumulative_pause_duration,
    })
  }

  // UPDATE, CLONE, DELETE already-saved stopwatch entry
  const updateEntry = (entryObj: IEntry, instruction: string) => {
    if (instruction === 'UPDATE') {
      return axios.put(`api/stopwatches/${entryObj.id}`, convertEntryToDBFormat(entryObj))
      .then((res) => {
        setAllEntries(allEntries.map((e: IEntry) => {
          return Number(e.id) === Number(res.data.id) ? {...entryObj} : e
        }))
        return res.data.id;
      })
      .catch((err) => {
        console.error(err);
      });
    }
    // if (instruction === 'CLONE') {
    //     // post to createEntry route, get newEntry.id
    //     // .then update local allEntries state CHECK SORT ORDER is by start_time
    //     let sortedAllEntries = []
    //     for (let i=0; i < allEntries.length; i++) {
    //       sortedAllEntries.push(allEntries[i])
    //       if (allEntries[i].id === entryObj.id) {
    //         sortedAllEntries.push(entryObj)
    //       }
    //     }
    //     setAllEntries(sortedAllEntries)
    //   }
    // if (instruction === 'DELETE') {
    //     // missing delete route?
    //   // post to deleteEntry route /:id
    //   // update local allEntries state
    //   setAllEntries(allEntries.filter((entry: IEntry) => entry.id !== entryObj.id))
    // }
    // if (instruction === 'PLAY') {
    //     setActiveEntry({
    //     ...entryObj,
    //     start_time: null,
    //     end_time: null,
    //     pause_start_time: null,
    //     cumulative_pause_duration: 0,
    //   });
    // }
  };
  
  const handleSaveNewEntry = (entryObj: IEntry) => {
    const inDbFormat = convertEntryToDBFormat(entryObj)
    return axios.post<IEntry>(`/api/stopwatches/${entryObj.id}`, inDbFormat)
      .then(res => {
        setAllEntries((prev: IEntry[]) => [...prev, {...entryObj, id: res.data.id}])
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const handleUpdateEntryTags = (entry_id: number, tag: ITag, remove: boolean) => {
    let promise;
    if (remove) {
      promise = axios.delete(`/api/stopwatches/${entry_id}/tags${(tag.id && `/${tag.id}`) || ""}`)
        .then((res) => {
          return tag.id || -1;
        });
    } else {
      promise = axios.post(`/api/stopwatches/${entry_id}/tags/${tag.id}`, tag)
        .then((res) => {
          return tag.id;
        });
    }
    return promise.catch((err) => {
      console.error(err);
    });
  };

  // Change format from DB to local state and construct local format if necessary
  const reformatCategoriesToLocal = (categoriesDB: ICategoryDB[]) => {
    return categoriesDB.map((cat: ICategoryDB) => ({id: cat.id, label: cat.name, value: cat.name, color: cat.color}))
  }
  const reformatTagsToLocal = (tagsDB: ITagDB[]) => {
    return tagsDB.map((tag: ITagDB) => ({ id: tag.id, label: tag.tag, value: tag.tag}))
  }
  const constructAllEntriesFromDB = (
    entriesDB: IEntryDB[],
    entries_tags: IEntriesTags[],
    categoriesDB: ICategoryDB[],
    tagsDB: ITagDB[]
  ) => {
    const categories: ICategory[] = reformatCategoriesToLocal(categoriesDB)

    const constructTagsObj = (entryId: number) => {  
      const tagsObjArr: ITag[] = [];
      entries_tags.map((et: IEntriesTags) => {
        if (et.entry_id === entryId) {
          tagsObjArr.push({
            id: tagsDB[et.tag_id].id,
            label: tagsDB[et.tag_id].tag,
            value: tagsDB[et.tag_id].tag
          })
        }
      })
      return tagsObjArr;
    }
    const allEntriesFormatted = entriesDB.map((entryDB: IEntryDB) => {
      return {
        ...entryDB,
        category: (entryDB.category !== null) && categories.filter((cat: ICategory) => cat.id === entryDB.category)[0],
        tags: entryDB.id && constructTagsObj(entryDB.id),
        start_time: new Date(String(entryDB.start_time)),
        end_time: new Date(String(entryDB.end_time)),
        pause_start_time: new Date(String(entryDB.pause_start_time)),
        intensity: Number(entryDB.intensity) * 100,
      }
    })
    console.log('allEntriesFormatted:', allEntriesFormatted);
    
    setAllEntries(allEntriesFormatted);
  }

  useEffect(() => {
    Promise.all([
      axios.get<ITimer[]>(`/api/pomodoro`),
      axios.get<ISound[]>(`/api/sound`),
      axios.get<ICategoryDB[]>(`/api/category`),
      axios.get<ITagDB[]>(`/api/tag`),
      axios.get<IEntryDB[]>(`/api/stopwatches`),
      axios.get<IEntriesTags[]>(`/api/stopwatches/entries_tags`),
    ])
      .then((all) => {
        const [pomodoros, sounds, categories, tags, entries, entries_tags] = all;
        setTimerPresets(pomodoros.data);
        setSoundFiles(sounds.data);
        setAllCategories(reformatCategoriesToLocal(categories.data));
        setAllTags(reformatTagsToLocal(tags.data));
        constructAllEntriesFromDB(entries.data, entries_tags.data, categories.data, tags.data);
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
            createNewCategory={handleCreateNewCategory}
            allTags={allTags}
            createNewTag={handleCreateNewTag}
            activeEntry={activeEntry}
            saveNewEntry={handleSaveNewEntry}
          />
        </section>
        <section className='section-analytics'>
          <Reports
            allCategories={allCategories}
            createNewCategory={handleCreateNewCategory}
            allTags={allTags}
            createNewTag={handleCreateNewTag}
            updateEntryTags={handleUpdateEntryTags}
            allEntries={allEntries}
            updateEntry={updateEntry}
          />
        </section>
      </section>
    </main>
  );
}

export default App;
