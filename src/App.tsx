import './App.css';
import StepInputInt from './components/StepInputInt';
import StepInputTimer from './components/StepInputTimer';
import StepInputClock from './components/StepInputClock';
import Stopwatch from './components/Stopwatch';

function App() {
  return (
    <div>
      <Stopwatch />
      <br />
      STEP INPUT INT
      <StepInputInt 
        name='integer'
        min='0'
      />
      <br />
      STEP INPUT TIME h:m:s +-5min
      <StepInputTimer
        name='timer'
      />
    </div>
  );
}

export default App;
