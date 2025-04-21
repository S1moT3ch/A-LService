import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

function App() {
  return (
    <Router basename="/user/dashboard/magazzino">
      <Routes>
        <Route path="/" element={<Magazzino />} />
        {/* altre route */}
      </Routes>
    </Router>
  );
}

export default App;
