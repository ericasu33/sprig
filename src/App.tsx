import './App.scss';
import StopwatchActive from './components/StopwatchActive';
import StopwatchList from './components/StopwatchList';

function App() {
  return (
    <div>
      <StopwatchActive />
      <br />
      <br />
      STOPWATCH ENTRIES
      <br />
      <StopwatchList />
    </div>
  );
}

export default App;
