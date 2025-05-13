import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import './components/style/MenuComponent.css';

const MenuComponent = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
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

  return (
    <div className="btn-column">
      <Link to="/user/dashboard/magazzino">
        <button className="btn-navbar">
          Gestisci il magazzino
        </button>
      </Link>
      <button
        onClick={handleLogout}
        className="btn-logout"
      >
        Logout
      </button>
    </div>
  );
};

export default MenuComponent;