import './App.css';
import DateRangePicker from './components/DateRangePicker'
import Bar from './components/ProgressBarByCategory'
import PieEntry from './components/Pie';


function App() {
  return (
    <div>
      <Bar />
      <PieEntry />
      <DateRangePicker />
    </div>
  );
}

export default App;
