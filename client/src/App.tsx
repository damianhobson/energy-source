import React from 'react';
import './App.css';
import { GraphContainer } from './components/GraphContainer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Energy Generation Stats</h1>
      </header>
      <section className="App-main"> 
        <GraphContainer title="Wind Generated"/>
      </section>
    </div>
  );
}

export default App;
