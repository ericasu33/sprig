import './App.css';
import Entries from './components/Entries';
import StepInputInt from './components/StepInputInt';
import StepInputTime from './components/StepInputTime';

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
      <StepInputTime
        value={0}
        format='timer'
        display={{hour: '2-digit', minute: '2-digit', second: '2-digit'}}
        stepSize={'5:00'}
      />
      <br />
      STEP INPUT TIME m:s += 10sec
      <StepInputTime
        value={0}
        format='timer'
        display={{minute: '2-digit', second: '2-digit'}}
        stepSize={'0:10'}
      />
    </div>
  );
}

export default App;
