import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    // Verifica se l'utente è autenticato facendo una richiesta al backend
    const checkAuthentication = async () => {
      try {
        const response = await fetch('https://a-lservice-production-39a8.up.railway.app/user/dashboard', {
          method: 'GET',
          credentials: 'include', // Include i cookie per la gestione della sessione
        });

        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Errore nella verifica dell\'autenticazione:', error);
        setIsAuthenticated(false);
      }
    };

    checkAuthentication();
  }, []);

  if (isAuthenticated === null) {
    // Caricamento mentre si verifica l'autenticazione
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return element; // Se l'utente è autenticato, renderizza il componente
  } else {
    return <Navigate to="/login" />; // Se non è autenticato, reindirizza al login
  }
};

export default PrivateRoute;