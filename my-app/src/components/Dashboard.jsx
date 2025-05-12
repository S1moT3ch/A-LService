import { useLocation, Link } from "react-router-dom";
import "./style/styleDashboard.css";
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  // Funzione per estrarre "nome" dal percorso (es: /user/dashboard/nome=Mario)
  const location = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);

  useEffect(() => {
  const fetchUsername = async () => {
    try {
      const response = await fetch('https://a-lservice-production-39a8.up.railway.app/user-info', {
        method: 'GET',
        credentials: 'include', // FONDAMENTALE per inviare il cookie
      });

      if (response.ok) {
        const data = await response.json();
        setUsername(data.username);
      } else {
        console.error('Utente non autenticato');
      }
    } catch (error) {
      console.error('Errore nel recupero dell\'username:', error);
    }
  };

  fetchUsername();
}, []);

const Logout = async () => {
  try {
    const response = await fetch('https://a-lservice-production-39a8.up.railway.app/logout', {
      method: 'GET',
      credentials: 'include',
    });

    if (response.ok) {
      navigate('/login');
    } else {
      console.error('Errore nel logout');
    }
  } catch (error) {
    console.error('Errore nella richiesta di logout:', error);
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
          {username ? `Ciao ${username}. Quale operazione vuoi fare?` : 'Ciao. Quale operazione vuoi fare?'}
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
        <button className="logout-btn" id="logout" onClick={Logout}>Logout</button>
      </div>
    </div>
  );
};

export default Dashboard;