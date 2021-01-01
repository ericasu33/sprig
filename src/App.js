import './App.css';
import Entries from './components/Entries';
import StepInput from './components/StepInput';
import StepInputTime from './components/StepInputTime';

function App() {
  return (
    <div>
      ENTRIES
      <Entries />
      <br />
      STEP INPUT INT
      <StepInput />
      <br />
      STEP INPUT TIME
      <StepInputTime
        value={new Date(0)}
        format={['h', 'm']}
        stepSize={1000 * 60*5}
      />
    </div>
  );
}

export default App;
