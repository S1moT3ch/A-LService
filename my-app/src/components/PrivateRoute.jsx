import React from 'react';
import { Navigate } from 'react-router-dom';

// Funzione di verifica dell'autenticazione
const isAuthenticated = () => {
  return document.cookie.includes('username');  // esempio con cookie
};

// Componente che verifica l'autenticazione e redirige se non autenticato
const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

export default PrivateRoute;