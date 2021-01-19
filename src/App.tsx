import './App.scss';
import StepInputInt from './components/StepInputInt';
import StepInputTimer from './components/StepInputTimer';
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
