import React from 'react';
import StepInputInt from './StepInputInt';
import StepInputTimer from './StepInputTimer';

const PomodoroForm = (props: any) => {
  return (
    <div>
      <div>
        <label>Name</label>
        
      </div>
      <div>
        <label>Work</label>
        <StepInputTimer></StepInputTimer>
      </div>
      <div>
        <label>Short Break</label>
        <StepInputTimer></StepInputTimer>
      </div>
      <div>
        <label>Repeats</label>
        <StepInputInt></StepInputInt>
      </div>
      <div>
        <label>Long Break</label>
        <StepInputTimer></StepInputTimer>
      </div>
    </div>
  );
};

export default PomodoroForm;