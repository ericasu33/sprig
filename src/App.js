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
        name='timer'
        value={0}
      />
    </div>
  );
}

export default App;
