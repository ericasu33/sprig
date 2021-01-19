import './App.scss';
import Stopwatch from './components/Stopwatch';
import PomodoroForm from './components/PomodoroForm'

function App() {
  return (
    <div>
      POMODORO
      <br />
      <PomodoroForm />
      <br />
      <br />
      STOPWATCH
      <br />
      <Stopwatch />
    </div>
  );
}

export default App;
