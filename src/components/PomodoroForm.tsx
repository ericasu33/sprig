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
    duration: 6000,
    work: 1000,
    p_work: 100,
  });

  const calcStats = ({work, short_break, long_break, cycles}: {[key:string]: number}) => {
    const duration_time = (work + short_break) * cycles + work + long_break;
    const work_time = work + work * cycles;
    if (!duration_time || !work_time) return null;
    const p_work = Math.floor((duration_time / work_time) * 100);
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
        <StepInputTimer />
      </div>
      <div>
        <label>Short Break</label>
        <StepInputTimer />
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
        <StepInputInt />
      </div>
      <div>
        <label>Long Break</label>
        <StepInputTimer />
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
        <StepInputTimer disabled value={stats.duration}/>
      </div>
      <div>
        <label>Total Work</label>
        <StepInputTimer disabled value={stats.work}/>
      </div>
      <div>
        <label>% Work</label>
        <StepInputInt disabled value={stats.p_work + "%"}/>
      </div>
    </div>
  );
};

export default PomodoroForm;