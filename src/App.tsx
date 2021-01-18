import './App.css';
import StepInputInt from './components/StepInputInt';
import StepInputTimer from './components/StepInputTimer';
// import StepInputClock from './components/StepInputClock';
import Stopwatch from './components/Stopwatch';

function App() {
  return (
    <div>
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
