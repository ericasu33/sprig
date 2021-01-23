import './App.scss';
import StopwatchActive from './components/StopwatchActive';
import StopwatchList from './components/StopwatchList';

function App() {
  return (
    <div>
      <div>
        <StopwatchActive />
      </div>
      <div>
        <StopwatchList />
      </div>
    </div>
  );
}

export default App;
