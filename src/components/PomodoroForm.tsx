import React, { useEffect, useState } from 'react';
import './PomodoroForm.scss';
import StepInputInt from './StepInputInt';
import StepInputTimer from './StepInputTimer';

interface Sound {
  id: number;
  file: string;
}

const PomodoroForm = (props: any) => {
  const [sounds, setSounds]: [Array<Sound>, Function] = useState([])

  useEffect(() => {
    setSounds([
      {id: 1, file: "test1.mp3"},
      {id: 2, file: "test2.mp3"},
      {id: 3, file: "test3.mp3"},
    ]);
  },[]);
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
        <StepInputTimer></StepInputTimer>
      </div>
      <div>
        <label>Short Break</label>
        <StepInputTimer></StepInputTimer>
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
        <StepInputInt></StepInputInt>
      </div>
      <div>
        <label>Long Break</label>
        <StepInputTimer></StepInputTimer>
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
        <StepInputTimer disabled/>
      </div>
      <div>
        <label>Total Work</label>
        <StepInputTimer disabled/>
      </div>
      <div>
        <label>% Work</label>
        <StepInputTimer disabled/>
      </div>
    </div>
  );
};

export default PomodoroForm;