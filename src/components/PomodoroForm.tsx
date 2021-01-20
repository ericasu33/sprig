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
    if (!props.pomo_timer) return;
    setStats((prev: any) => {
      const newStats = calcStats(props.pomo_timer);
      return newStats || prev;
    });
  }, [props.pomo_timer]);

  const soundOptions = props.sounds.map((sound: Sound) => {
    return (
      <option
        key={sound.id}
        value={sound.file}
      >
        {sound.file}
      </option>
    );
  });

  const updateState = (key: string, value: number) => {
    props.setPomoTimer((prev: any) => {
      return {
        ...prev,
        [key]: value,
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
          name='work'
          value={props.pomo_timer.work}
          setValue={updateState}
        />
      </div>
      <div>
        <label>Short Break</label>
        <StepInputTimer
          name='short_break'
          value={props.pomo_timer.short_break}
          setValue={updateState}
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
          name='cycles'
          value={props.pomo_timer.cycles}
          setValue={updateState}
          min={0}
        />
      </div>
      <div>
        <label>Long Break</label>
        <StepInputTimer 
          name='long_break'
          value={props.pomo_timer.long_break}
          setValue={updateState}
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