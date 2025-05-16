import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const [auth, setAuth] = useState(null); // null = loading, false = no auth, true = ok
  const token = localStorage.getItem('token');

  useEffect(() => {
    const checkAuth = async () => {
      try {
          const res = await fetch('https://a-lservice-production-39a8.up.railway.app/api/check-auth', {
          credentials: 'include',
        });

        if (res.ok) {
          setAuth(true);
        } else {
          setAuth(false);
        }
      } catch {
        setAuth(false);
      }
    };

    checkAuth();
  }, []);

  if (auth === null) return <div>Loading...</div>; // In attesa della verifica
  if (auth === false) return <Navigate to="/login" />;
  return children; // Accesso consentito
};

export default PrivateRoute;