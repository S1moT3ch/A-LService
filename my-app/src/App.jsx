import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
  } from 'react-router-dom';
  
  import ListaPezzi from './components/ListaPezzi';
  import FormPezzo from './components/FormPezzo';
  import Home from './components/Home';
  import Login from './components/Login';
  import { useState } from 'react';
  
  const MagazzinoPage = () => {
    const [refresh, setRefresh] = useState(false);
    return (
      <div className="max-w-4xl mx-auto">
        <FormPezzo onSaved={() => setRefresh(!refresh)} />
        <ListaPezzi key={refresh} />
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
            path="/user/dashboard/magazzino"
            element={<MagazzinoPage />}
          />
        </Routes>
      </Router>
    );
  }
  
  export default App;