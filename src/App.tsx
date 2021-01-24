import './App.css';
import StackBarEntry from './components/DisplayStackBarCategoryAndDate'

const test = {
  height: "500px",
  width: "500px",
};

function App() {
  return (
    <div style={test}>
      <StackBarEntry />
    </div>
  );
}

export default App;
