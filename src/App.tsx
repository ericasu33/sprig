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
  const [activeEntry, setActiveEntry]: [IEntry | null, Function] = useState({
    id: undefined,
    category: null,
    tags: null,
    start_time: null,
    end_time: null,
    intensity: 100,
    pause_start_time: null,
    cumulative_pause_duration: 0,
  });

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
        setAllCategories((prev: ICategory[]) => {
          return [ ...prev, { ...category, id: res.data.id } ];
        });
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
        setAllTags((prev: ITag[]) => {
          return [ ...prev, { ...tag, id: res.data.id } ];
        });
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
      intensity: entryObj.intensity,
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
    if (instruction === 'CLONE') {
        // NOTE : something is wrong with how tags are stored inside of the objects, causing clones to not work
        axios.post(`api/stopwatches`, convertEntryToDBFormat(entryObj))
          .then((res) => {
            if (!entryObj || !entryObj.tags) return;
            const {tags}: any = entryObj;
            const promises = tags.map((tag: ITag) => {
              return axios.post(`api/stopwatches/${entryObj.id}/tags/${tag.id}`);
            });
            return Promise.all(promises);
          })
          .then((res) => {
            let sortedAllEntries = []
            for (let i=0; i < allEntries.length; i++) {
              sortedAllEntries.push(allEntries[i])
              if (allEntries[i].id === entryObj.id) {
                sortedAllEntries.push(entryObj)
              }
            }
            setAllEntries(sortedAllEntries);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    if (instruction === 'DELETE') {
      axios.delete(`api/stopwatches/${entryObj.id}`)
        .then((res) => {
          return axios.delete(`api/stopwatches/${entryObj.id}/tags`);
        })
        .then((res) => {
          setAllEntries(allEntries.filter((entry: IEntry) => entry.id !== entryObj.id))
        })
        .catch((err) => {
          console.error(err);
        });
    }
    if (instruction === 'PLAY') {
      setActiveEntry({
        ...entryObj,
        start_time: null,
        end_time: null,
        pause_start_time: null,
        cumulative_pause_duration: 0,
      });
    }
  };
  
  const handleSaveNewEntry = (entryObj: IEntry) => {
    const inDbFormat = convertEntryToDBFormat(entryObj)
    return axios.post<IEntry>(`/api/stopwatches`, inDbFormat)
      .then(res => {
        const {tags}: any = entryObj;
        const promises = tags.map((tag: ITag) => {
          return axios.post(`api/stopwatches/${res.data.id}/tags/${tag.id}`);
        });
        setAllEntries((prev: IEntry[]) => [...prev, {...entryObj, id: res.data.id}]);
        return Promise.all(promises);
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
      for (const et of entries_tags) {
        if (et.entry_id === entryId) {
          const tag = tagsDB.find((tag) => tag.id === et.tag_id);
          if (tag) {
            tagsObjArr.push({ id: tag.id, label: tag?.tag, value: tag.tag });
          }
        }
      }
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
        intensity: Number(entryDB.intensity),
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
      <section className='main-app'>
        <div className='top-panel'>
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
          <div className='pm-activesw'>
            <section className='pm-activesw-pomo'>
              <PomodoroTimer 
                timers={timerPresets}
                saveTimer={handleAddTimer}
                sounds={soundFiles}
              />
            </section>
            <section className='pm-activesw-sw'>
              <StopwatchActive
                allCategories={allCategories}
                updateAllCategories={() => console.log('app.tsx runs update all categories')}
                allTags={allTags}
                updateAllTags={() => console.log('app.tsx runs update all tags')}
                createNewCategory={handleCreateNewCategory}
                createNewTag={handleCreateNewTag}
                handleChangeEntryTags={handleUpdateEntryTags}
                activeEntry={activeEntry}
                setActiveEntry={setActiveEntry}
                saveNewEntry={handleSaveNewEntry}
              />
            </section>
          </div>
        </div>
        <section className='section-analytics'>
          <Reports
            allCategories={allCategories}
            updateAllCategories={() => console.log('app.tsx runs update all categories')}
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
