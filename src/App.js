import './App.css';
import Entries from './components/Entries';
import StepInputInt from './components/StepInputInt';
import StepInputTimer from './components/StepInputTimer';
import StepInputClock from './components/StepInputClock';

function App() {
  return (
    <div>
      ENTRIES
      <Entries />
      <br />
      STEP INPUT INT
      <StepInputInt />
      <br />
      STEP INPUT TIME h:m:s +-5min
      <StepInputTimer
        value={0}
        format='timer'
        display={{hour: '2-digit', minute: '2-digit', second: '2-digit'}}
        stepSize={'5:00'}
      />
      <br />
      STEP INPUT TIME m:s += 10sec
      <StepInputTimer
        value={0}
        format='timer'
        display={{hour: '2-digit', minute: '2-digit', second: '2-digit'}}
        stepSize={'0:10'}
      />
    </div>
  );
}

export default App;
