import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style/UserComponent.css';

const UserComponent = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch('https://a-lservice-production-39a8.up.railway.app/whoisuser', {
          method: 'GET',
          credentials: 'include' // essenziale per leggere i cookie
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          console.error('Utente non trovato');
        }
      } catch (error) {
        console.error('Errore nel recupero utente:', error);
      }
    };

    fetchUserData();
  }, []);
  return (
    <div className="btn-column">
      {user ? (
        <div className="user-info">
          <p>Riepilogo utente loggato</p>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Cognome:</strong> {user.cognome}</p>
          <p><strong>Ruolo:</strong> {user.ruolo}</p>
        </div>
      ) : (
        <p>Caricamento utente...</p>
      )}

    </div>
  );
};

export default UserComponent;