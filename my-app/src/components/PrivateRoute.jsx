import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Stato per memorizzare lo stato di autenticazione
  const navigate = useNavigate(); // Usa il hook di React Router per la navigazione

  useEffect(() => {
    // Verifica se l'utente è autenticato facendo una richiesta al backend
    const checkAuthentication = async () => {
      try {
        const response = await fetch('https://a-lservice-production-39a8.up.railway.app/user/dashboard', {
          method: 'GET',
          credentials: 'include', // Includi il cookie per la sessione
        });

        if (response.status === 401) {
          setIsAuthenticated(false);
          navigate('/login'); // Reindirizza alla pagina di login se non autenticato
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Errore durante la verifica dell\'autenticazione:', error);
        setIsAuthenticated(false);
        navigate('/login'); // In caso di errore, reindirizza al login
      }
    };

    checkAuthentication(); // Chiamata per verificare l'autenticazione
  }, [navigate]); // Aggiungi `navigate` come dipendenza per evitare loop infiniti

  if (isAuthenticated === null) {
    // Mostra un caricamento mentre si verifica l'autenticazione
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return element; // Se l'utente è autenticato, renderizza il componente
  } else {
    return <Navigate to="/login" />; // Se non è autenticato, reindirizza al login
  }
};

export default PrivateRoute;