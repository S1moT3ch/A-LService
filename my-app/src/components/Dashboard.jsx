import React from "react";
import { useLocation, Link } from "react-router-dom";
import "./style/styleDashboard.css";
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  // Funzione per estrarre "nome" dal percorso (es: /user/dashboard/nome=Mario)
  const location = useLocation();
  const navigate = useNavigate();

  const getNomeFromPath = () => {
    const path = location.pathname;
    const regex = /\/user\/dashboard\/nome=([^/]+)/;
    const match = path.match(regex);
    return match ? decodeURIComponent(match[1]) : null;
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('https://a-lservice-production-39a8.up.railway.app/logout', {
        method: 'GET',
        credentials: 'include', // per inviare i cookie
      });
  
      const result = await response.json();
  
      if (response.ok && result.success) {
        // Reindirizza o azzera stato
        navigate('/login');
      }
    } catch (error) {
      console.error('Errore durante il logout:', error);
    }
  };

  //const nomeUtente = getNomeFromPath();

  return (
    <div>
      <head>
        <title>A&LService-Management</title>
        <link rel="icon" type="image/vnd.icon" href="/images/LogoAl.ico" />
      </head>
      <div className="barra">
        <p>Gestionale di A&amp;L</p>
      </div>

      <div className="benvenuto">
        <p id="saluto">
            Ciao. Quale operazione vuoi fare?
        </p>
      </div>

      <div className="azioni-container">
        <Link to="/user/dashboard/magazzino">
          <button className="azione-btn" id="azione1">
            Gestisci il magazzino
          </button>
        </Link>
      </div>

      <div className="uscita">
        <button classname="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Dashboard;