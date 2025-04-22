import logo from './logo.svg';
import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import Magazzino from './pages/Magazzino'; // creeremo questo file

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/user/dashboard/magazzino" element={<Home />} />
        {/* Puoi aggiungere altre rotte qui */}
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

const Home = () => (
  <div className="App">
    <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </header>
  </div>
);

export default App;