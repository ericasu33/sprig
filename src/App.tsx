import './App.scss';
import Stopwatch from './components/Stopwatch';
import StopwatchEntries from './components/StopwatchEntries';

function App() {
  return (
    <div>
      <Stopwatch />
      <br />
      <br />
      STOPWATCH ENTRIES
      <br />
      <StopwatchEntries />
    </div>
  );
}

export default App;
