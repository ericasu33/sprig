import React, { useEffect, useState } from 'react';
import './PomodoroForm.scss';
import StepInputInt from './StepInputInt';
import StepInputTimer from './StepInputTimer';

const PomodoroForm = (props: any) => {
  const [sounds, setSounds]: [Array<string | undefined>, Function] = useState([])

  useEffect(() => {
    setSounds([
      "test1.mp3",
      "test2.mp3",
      "test3.mp3",
    ]);
  },[]);
  const soundOptions = sounds.map((sound) => {
    return (
      <option
        value={sound}
      >
        {sound}
      </option>
    );
  });

  return (
    <div className="pomodoro-form">
      <div>
        <label>Name</label>
        <select>
          {soundOptions}
          <option selected disabled value="new-pomodoro">New Pomodoro</option>
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
          <select>
            <option selected disabled value="none">Start Break Sound</option>
            <option value="none">none</option>
            {soundOptions}
          </select>
          <select>
            <option selected disabled value="none">End Break Sound</option>
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
          <select>
            <option selected disabled value="none">Start Long Break Sound</option>
            <option value="none">none</option>
            {soundOptions}
          </select>
          <select>
            <option selected disabled value="none">End Long Break Sound</option>
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