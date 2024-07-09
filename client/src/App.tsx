import './App.scss';
import { GraphContainer } from './components/GraphContainer';
import { PieContainer } from './components/PieContainer';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Where is our Power coming from?</h1>
      </header>
      <section className="App-main"> 
        <GraphContainer title="Wind Generated"/>
        <PieContainer title="Fuel Mix"/>
      </section>
    </div>
  );
}

export default App;
