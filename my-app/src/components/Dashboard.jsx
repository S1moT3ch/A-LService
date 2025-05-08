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

  const Logout = () => {
    const navigate = useNavigate();
  
    const handleLogout = async () => {
      try {
        const response = await fetch('https://a-lservice-production-39a8.up.railway.app/logout', {
          method: 'GET',
          credentials: 'include', // Includi i cookie per mantenere la sessione
        });
  
        if (response.ok) {
          // Se il logout è stato eseguito con successo, redirigi l'utente alla pagina di login
          navigate('/login');
        } else {
          console.error('Errore nel logout');
        }
      } catch (error) {
        console.error('Errore nella richiesta di logout:', error);
      }
    };
  
    // Effettua il logout automaticamente quando il componente viene montato
    React.useEffect(() => {
      handleLogout();
    }, []);
  
    return null; // Questo componente non ha bisogno di renderizzare nulla
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
        <button className="logout-btn" id="logout" onClick={Logout}>Logout</button>
      </div>
    </div>
  );
};

export default Dashboard;