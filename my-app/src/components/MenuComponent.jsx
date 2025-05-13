import { Link, useNavigate } from 'react-router-dom';
import React from 'react';

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
    <div className="flex flex-col p-2">
      <Link to="/user/dashboard/magazzino">
        <button className="py-2 px-4 hover:bg-gray-100 text-left w-full">
          Gestisci il magazzino
        </button>
      </Link>
      <button
        onClick={handleLogout}
        className="py-2 px-4 hover:bg-red-100 text-left text-red-600 w-full"
      >
        Logout
      </button>
    </div>
  );
};

export default MenuComponent;