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
    setTimerPresets((prev: ITimer[]) => {
      if (timer.id === null) {
        return [ ...prev, { ...timer, id: timerPresets.length + 1 } ];
      }
      return prev.map((t: ITimer) => t.id === timer.id ? {...timer} : t);
    });
    return timerPresets.length + 1;
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
        setAllCategories(categories.data);
        setAllTags(tags.data);
        setAllEntries(entries.data);
        console.log(all);
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
            activeEntry={activeEntryData}
          />
        </section>
        <section className='section-analytics'>
          <Reports
            allCategories={allCategories}
            updateAllCategories={() => console.log('app.tsx runs update all categories')}
            allTags={allTags}
            updateAllTags={() => console.log('app.tsx runs update all tags')}
            allEntries={allEntries}
            updateEntry={() => console.log('app.tsx runs update entry')} // see updateEntry in hooks/stopwatchFuncs
          />
        </section>
      </section>
    </main>
  );
}

export default App;
