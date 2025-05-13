import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import React, { useState } from 'react';
import PrivateRoute from './components/PrivateRoute';

import Home from './components/Home';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

import MenuIcon from '@mui/icons-material/Menu';
import MenuComponent from './components/MenuComponent';

import ListaPezzi from './components/ListaPezzi';
import FormPezzo from './components/FormPezzo';
import FormLocazione from './components/FormLocazione';
import ListaLocazioni from './components/ListaLocazioni';
import './components/style/FormApp.css';


const handleClick = () => {
  window.history.back();
};

const MagazzinoPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [showLoc, setShowLoc] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [refreshLoc, setRefreshLoc] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="header">
        <img src="/images/Logo_full.png" alt="Logo AL" className="logo" />
          <h1 className="caption">Gestionale di A&L</h1>
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-cyan-500 hover:text-cyan-300 focus:outline-none"
            >
              <MenuIcon fontSize="large" />
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                <MenuComponent />
              </div>
              )}
          </div>
          </div>
          <div class="intro">
            <h3>Magazzino di Acoustic&Light</h3>
          </div>
        
    
    
    {/* LOCATIONS */}
    <hr />
      
      <div className="form-toggle">
      <button
      onClick={() => setShowLoc(!showLoc)}
      className="btn-toggle"
      >
      {showLoc ? '➖ Nascondi il modulo' : '➕ Inserisci una nuova locazione'}
      </button>

      <div className={`form-animated ${showLoc ? 'open' : ''}`}>
      <FormLocazione onSaved={() => setRefreshLoc(!refreshLoc)} />
      <ListaLocazioni refreshTrigger={refreshLoc} />
      </div>
    </div>

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
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route 
  path="/user/dashboard" 
  element={
    <PrivateRoute>
      <Dashboard />
    </PrivateRoute>
  }
/>
<Route 
  path="/user/dashboard/magazzino" 
  element={
    <PrivateRoute>
      <MagazzinoPage />
    </PrivateRoute>
  }
/>
      </Routes>
    </Router>
  );
}

export default App;