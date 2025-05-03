import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import React, { useState } from 'react';

import ListaPezzi from './components/ListaPezzi';
import FormPezzo from './components/FormPezzo';
import FormLocazione from './components/FormLocazione';
import './components/style/FormApp.css';

const handleClick = () => {
  window.history.back();
};

const MagazzinoPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [refreshLoc, setRefreshLoc] = useState(false);
  return (
    <div className="max-w-4xl mx-auto">
      <div class="barra">
      <p1>Gestionale di A&L</p1>
    </div>
    <div class="intro">
      <h1>Magazzino di Acoustic&Light</h1>
    </div>
    
    {/* LOCATIONS */}
    <hr />
      <h2>Gestione Locazioni</h2>
      <FormLocazione onSaved={() => setRefreshLoc(!refreshLoc)} />

    <div className="form-toggle">
      <button
      onClick={() => setShowForm(!showForm)}
      className="btn-toggle"
      >
      {showForm ? '➖ Nascondi il modulo' : '➕ Inserisci un nuovo pezzo'}
      </button>

      <div className={`form-animated ${showForm ? 'open' : ''}`}>
      <FormPezzo onSaved={() => setRefresh(!refresh)} />
      </div>
    </div>
      <ListaPezzi key={refresh} />

      <div className="indietro">
      <button onClick={handleClick} className="btn-indietro">
        ← Indietro
      </button>
      </div>
    </div>
    
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/user/dashboard/magazzino"
          element={<MagazzinoPage />}
        />
      </Routes>
    </Router>
  );
}

export default App;