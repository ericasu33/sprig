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
} from './hooks/stopwatchData';

import { ISound, ITimer, ICategory, ITag, IEntry } from 'ts-interfaces/interfaces';

function App() {
  const [timerPresets, setTimerPresets]: [ITimer[], Function] = useState([]);
  const [soundFiles, setSoundFiles]: [ISound[], Function] = useState([]);
  const [allCategories, setAllCategories]: [ICategory[], Function] = useState([]);
  const [allTags, setAllTags]: [ITag[], Function] = useState([]);
  const [allEntries, setAllEntries]: [IEntry[], Function] = useState([]);

  const handleAddTimer = (timer: ITimer) => {
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

  const handleAddCategory = (category: ICategory) => {
    return axios.post(`/api/category`, category)
      .then((res) => {
        return res.data.id;
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleAddTag = (tag: ITag) => {
    return axios.post(`/api/tag`, tag)
      .then((res) => {
        return res.data.id;
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleChangeEntryTags = (entry_id: number, tag: ITag, remove: boolean) => {
    let promise;
    if (remove) {
      promise = axios.delete(`/api/stopwatches/${entry_id}/tags${(tag.id && `/${tag.id}`) || ""}`)
        .then((res) => {
          return res.data;
        });
    } else {
      promise = axios.post(`/api/stopwatches/${entry_id}/tags/${tag.id}`, tag)
        .then((res) => {
          return res.data;
        });
    }
    return promise.catch((err) => {
      console.error(err);
    });
  };

  useEffect(() => {
    Promise.all([
      axios.get<ITimer[]>(`/api/pomodoro`),
      axios.get<ISound[]>(`/api/sound`),
      axios.get<ICategory[]>(`/api/category`),
      axios.get<ITag[]>(`/api/tag`),
      axios.get<IEntry[]>(`/api/stopwatches`),
    ])
      .then((all) => {
        const [pomodoros, sounds, categories, tags, entries] = all;
        setTimerPresets(pomodoros.data);
        setSoundFiles(sounds.data);
        setAllCategories(categories.data.map((cat: ICategory) => ({id: cat.id, label: cat.name, value: cat.name, color: cat.color})));
        setAllTags(tags.data.map((tag: ITag) => ({ id: tag.id, label: tag.tag, value: tag.tag})));
        setAllEntries(entries.data);
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
            <div className='nav-title'>TRACK<br />SUITE</div>
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
            updateAllCategories={handleAddCategory}
            allTags={allTags}
            updateAllTags={handleAddTag}
            blankActiveEntry={blankActiveEntry}
            activeEntry={activeEntryData}
          />
        </section>
        <section className='section-analytics'>
          <Reports
            allCategories={allCategories}
            updateAllCategories={handleAddCategory}
            allTags={allTags}
            updateAllTags={handleAddTag}
            updateEntriesTags={handleChangeEntryTags}
            allEntries={allEntriesData}
          />
        </section>
      </section>
    </main>
  );
}

export default App;
