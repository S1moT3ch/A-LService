import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
  } from 'react-router-dom';
  
  import ListaPezzi from './components/ListaPezzi';
  import FormPezzo from './components/FormPezzo';
  
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
          <Route
            path="/user/dashboard/magazzino"
            element={<MagazzinoPage />}
          />
          <Route path="*" element={<Navigate to="/user/dashboard/magazzino" replace />} />
        </Routes>
      </Router>
    );
  }
  
  export default App;