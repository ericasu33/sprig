import './App.css';
import StepInputInt from './components/StepInputInt';
import StepInputTimer from './components/StepInputTimer';
import Stopwatch from './components/Stopwatch';
import PomodoroForm from './components/PomodoroForm'

function App() {
  return (
    <div>
      POMODORO
      <PomodoroForm >
        
      </PomodoroForm>
      <br />
      <br />
      STOPWATCH
      <br />
      <Stopwatch />
      <br />
      <br />
      SET INTEGER
      <br />
      <StepInputInt 
        name='integer'
        min='0'
      />
      <br />
      <br />
      SET TIMER
      <br />
      <StepInputTimer
        name='timer'
      />
    </div>
  );
}

export default App;
