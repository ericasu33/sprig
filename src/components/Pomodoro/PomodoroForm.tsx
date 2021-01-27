import React, { useEffect, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import StepInputInt from 'components/StepInputInt';
import StepInputTimer from 'components/StepInputTimer';
import Button from 'components/Button';

import './PomodoroTimer.scss';

import { IStats, ISound } from 'ts-interfaces/interfaces';

const PomodoroForm = (props: any) => {

  const [stats, setStats]: [IStats, Function] = useState({
    duration: 0,
    work: 0,
    p_work: 0,
  });

  const [name, setName] = useState({
    id: props.pomo_timer.id,
    value: props.pomo_timer.name,
    label: props.pomo_timer.name,
  });

  const calcStats = ({work, short_break, long_break, cycles}: {[key:string]: number}) => {
    const duration_time = (work + short_break) * (cycles - 1) + work + long_break;
    const work_time = work * cycles;
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

  const soundOptions = props.sounds.map((sound: ISound) => {
    return (
      <option
        key={sound.id}
        value={sound.id}
      >
        {sound.name}
      </option>
    );
  });

  const timerOptions = props.timers.map((timer: any) => {
    return {
        id: timer.id,
        value: timer.id,
        label: timer.name,
    };
  });

  const updateState = (key: string, value: number | null) => {
    props.setPomoTimer((prev: any) => {
      return {
        ...prev,
        [key]: value,
      }
    });
  };

  const handleTimerChange = (obj: any) => {
    setName(obj);
    if (obj !== null) {
      props.changeTimer({ id: obj.id, name: obj.label});
    }
  };

  const handleCreate = (name: any) => {
    setName({ id: null, value: name, label: name});
    props.changeTimer({ id: null, name});
  };

  return (
    <div className="pomodoro-form">
      
      <div className='pm-group'>
        <Button save disabled={props.disabled} onClick={props.onSave} />
      </div>

      <div className='pm-input-container'>
        <div className='pm-inputs-times'>
          <div className='pm-name-selector'>
            <label className='pm-name-label'>Timer name</label>
            <CreatableSelect
              isDisabled={props.disabled}
              className='pm-name-input'
              isClearable
              onChange={handleTimerChange}
              onCreateOption={handleCreate}
              options={timerOptions}
              value={name || ""}
              formatCreateLabel={(input) => `Create timer: "${input}"`}
            />
          </div>

          <div className='pm-inputs-group'>
            <label>Work</label>
            <StepInputTimer
              disabled={props.disabled}
              name='work'
              value={props.pomo_timer.work}
              setValue={updateState}
              stepValue={60}
            />
          </div>
          
          <div className='pm-inputs-group pm-input-break'>
            <label>Shortbreak</label>
            <StepInputTimer
              disabled={props.disabled}
              name='short_break'
              value={props.pomo_timer.short_break}
              setValue={updateState}
              stepValue={60}
            />
          </div>
          
          <div className='pm-inputs-group'>
            <label>Repeats</label>
            <StepInputInt 
              disabled={props.disabled}
              name='cycles'
              value={props.pomo_timer.cycles}
              setValue={updateState}
              min={0}
            />
          </div>
          
          <div className='pm-inputs-group pm-input-break'>
            <label>Longbreak</label>
            <StepInputTimer 
              disabled={props.disabled}
              name='long_break'
              value={props.pomo_timer.long_break}
              setValue={updateState}
              stepValue={60}
            />
          </div>
        </div>

        <div className='pm-inputs-alerts'>
          <div className='pm-alerts-title'>
            Set alert sounds:
          </div>
          <div className='pm-alerts-group'>
            <label>Shortbreak START</label>
            <select 
              disabled={props.disabled}
              value={props.pomo_timer.short_b_start_sound || ""}
              onChange={(e) => updateState("short_b_start_sound", Number(e.target.value) || null)}
            >
              <option disabled value="">(no alert)</option>
              <option value="">none</option>
              {soundOptions}
            </select>
          </div>
          <div className='pm-alerts-group'>
            <label>Shortbreak END</label>
            <select 
              disabled={props.disabled}
              value={props.pomo_timer.short_b_end_sound || ""}
              onChange={(e) => updateState("short_b_end_sound", Number(e.target.value) || null)}
            >
              <option disabled value="">(no alert)</option>
              <option value="">none</option>
              {soundOptions}
            </select>
          </div>
          <div className='pm-alerts-group'>
            <label>Longbreak START</label>
            <select 
              disabled={props.disabled}
              value={props.pomo_timer.long_b_start_sound || ""}
              onChange={(e) => updateState("long_b_start_sound", Number(e.target.value) || null)}
            >
              <option disabled value="">(no alert)</option>
              <option value="">none</option>
              {soundOptions}
            </select>
          </div>
          <div className='pm-alerts-group'>
            <label>Longbreak END</label>
            <select 
              disabled={props.disabled}
              value={props.pomo_timer.long_b_end_sound || ""}
              onChange={(e) => updateState("long_b_end_sound", Number(e.target.value) || null)}
            >
              <option disabled value="">(no alert)</option>
              <option value="">none</option>
              {soundOptions}
            </select>
          </div>
        </div>
      </div>

      <div className='pm-right-buttons'>
        <div className='pm-group pm-calc-times'>
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
      </div>

    </div>
  );
};

export default PomodoroForm;