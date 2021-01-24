import { useState } from 'react';
import './App.scss';
import StopwatchActive from 'components/Stopwatch/StopwatchActive';
import AnalyzeStopwatch from 'components/Stopwatch/AnalyzeStopwatch';
import PomodoroTimer from 'components/Pomodoro/PomodoroTimer';
import 'components/Pomodoro/PomodoroTimer'
import presetPomodoros from 'db/preset-timers'

import { ISound, ITimer } from 'ts-interfaces/interfaces';

const sounds: ISound[] = [
  {id: 1, file: "test1.mp3"},
  {id: 2, file: "test2.mp3"},
  {id: 3, file: "test3.mp3"},
];

function App() {
  const [timerPresets, setTimerPresets] = useState(presetPomodoros);
  const [soundFiles, setSoundFiles] = useState(sounds);

  const handleAddTimer = (timer: ITimer) => {
    setTimerPresets((prev) => {
      if (timer.id === null) {
        return [ ...prev, { ...timer, id: timerPresets.length + 1 } ];
      }
      return prev.map((t) => t.id === timer.id ? {...timer} : t);
    });
    return timerPresets.length + 1;
  };

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
          <StopwatchActive />
        </section>
        <section className='section-sw-entries'>
          <AnalyzeStopwatch />
        </section>
      </section>
    </main>
  );
}

export default App;
