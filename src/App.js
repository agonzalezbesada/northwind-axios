import './App.css';
import DataManager from './components/DataManager';

function App() {
  return (
    <div className="App">
      <table className="orders-data">
        <DataManager />
      </table>
    </div>
  );
}

export default App;
