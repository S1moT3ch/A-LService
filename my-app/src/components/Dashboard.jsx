import React from "react";
import { useLocation, Link } from "react-router-dom";
import "./style/styleDashboard.css";

const Dashboard = () => {
  // Funzione per estrarre "nome" dal percorso (es: /user/dashboard/nome=Mario)
  const location = useLocation();

  const getNomeFromPath = () => {
    const path = location.pathname;
    const regex = /\/user\/dashboard\/nome=([^/]+)/;
    const match = path.match(regex);
    return match ? decodeURIComponent(match[1]) : null;
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
        <Link to="/logout">
          <button className="logout-btn" id="logout">
            Logout
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;