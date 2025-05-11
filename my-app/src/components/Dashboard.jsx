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
    const cookieUsername = getCookie('username');
    if (cookieUsername) {
      setUsername(cookieUsername);
    }
    }, []);

  const getNomeFromPath = () => {
    const path = location.pathname;
    const regex = /\/user\/dashboard\/nome=([^/]+)/;
    const match = path.match(regex);
    return match ? decodeURIComponent(match[1]) : null;
  };

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

function getCookie(name) {
  const cookies = document.cookie.split('; ');
  for (let cookie of cookies) {
    const [key, value] = cookie.split('=');
    if (key === name) return decodeURIComponent(value);
  }
  return null;
}

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