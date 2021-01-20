import React, { useEffect, useState } from 'react';
import './PomodoroForm.scss';
import StepInputInt from './StepInputInt';
import StepInputTimer from './StepInputTimer';

interface Sound {
  id: number;
  file: string;
};

interface Stats {
  duration: number;
  work: number;
  p_work: number;
};

const PomodoroForm = (props: any) => {
  const [sounds, setSounds]: [Array<Sound>, Function] = useState([]);
  const [stats, setStats]: [Stats, Function] = useState({
    duration: 0,
    work: 0,
    p_work: 0,
  });

  const calcStats = ({work, short_break, long_break, cycles}: {[key:string]: number}) => {
    const duration_time = (work + short_break) * cycles + work + long_break;
    const work_time = work + work * cycles;
    if (!duration_time || !work_time) return null;
    const p_work = Math.floor((work_time / duration_time) * 100);
    return { duration: duration_time, work: work_time, p_work};
  };

  useEffect(() => {
    setSounds([
      {id: 1, file: "test1.mp3"},
      {id: 2, file: "test2.mp3"},
      {id: 3, file: "test3.mp3"},
    ]);
  },[]);

  useEffect(() => {
    if (!props.pomo_timer) return;
    setStats((prev: any) => {
      const newStats = calcStats(props.pomo_timer);
      return newStats || prev;
    });
  }, [props.pomo_timer]);

  const soundOptions = sounds.map((sound) => {
    return (
      <option
        key={sound.id}
        value={sound.file}
      >
        {sound.file}
      </option>
    );
  });

  
  const setWork = (time: number) => {
    props.setPomoTimer((prev: any) => {
      return {
        ...prev,
        work: time,
      }
    });
  };

  const setShortBreak = (time: number) => {
    props.setPomoTimer((prev: any) => {
      return {
        ...prev,
        short_break: time,
      }
    });
  };

  const setLongBreak = (time: number) => {
    props.setPomoTimer((prev: any) => {
      return {
        ...prev,
        long_break: time,
      }
    });
  };

  const setCycles = (num: number) => {
    props.setPomoTimer((prev: any) => {
      return {
        ...prev,
        cycles: num,
      }
    });
  };

  return (
    <div className="pomodoro-form">
      <div>
        <label>Name</label>
        <select defaultValue="new-pomodoro">
          {soundOptions}
          <option value="new-pomodoro">New Pomodoro</option>
        </select>
      </div>
      <div>
        <label>Work</label>
        <StepInputTimer 
          value={props.pomo_timer.work}
          setValue={setWork}
        />
      </div>
      <div>
        <label>Short Break</label>
        <StepInputTimer 
          value={props.pomo_timer.short_break}
          setValue={setShortBreak}
        />
        <div>
          <select defaultValue="none">
            <option disabled value="none">Start Break Sound</option>
            <option value="none">none</option>
            {soundOptions}
          </select>
          <select defaultValue="none">
            <option disabled value="none">End Break Sound</option>
            <option value="none">none</option>
            {soundOptions}
          </select>
        </div>
      </div>
      <div>
        <label>Repeats</label>
        <StepInputInt 
          value={props.pomo_timer.cycles}
          setValue={setCycles}
          min={0}
        />
      </div>
      <div>
        <label>Long Break</label>
        <StepInputTimer 
          value={props.pomo_timer.long_break}
          setValue={setLongBreak}
        />
        <div>
          <select defaultValue="none">
            <option disabled value="none">Start Long Break Sound</option>
            <option value="none">none</option>
            {soundOptions}
          </select>
          <select defaultValue="none">
            <option disabled value="none">End Long Break Sound</option>
            <option value="none">none</option>
            {soundOptions}
          </select>
        </div>
      </div>
      <div>
        <label>Total Duration</label>
        <StepInputTimer disabled 
          value={stats.duration}
        />
      </div>
      <div>
        <label>Total Work</label>
        <StepInputTimer disabled 
          value={stats.work}
        />
      </div>
      <div>
        <label>% Work</label>
        <StepInputInt disabled 
          value={stats.p_work}
        />
      </div>
    </div>
  );
};

export default PomodoroForm;