import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style/ListaLocazioni.css';

const ListaLocazioni = ({ refreshTrigger }) => {
  const [locazioni, setLocazioni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://a-lservice-production-39a8.up.railway.app/locazione-db')  // Modifica questo URL con quello del tuo backend
      .then((response) => response.json())  // Converte la risposta in JSON
      .then((data) => {
        setLocazioni(data);  // Imposta i dati nel state
        setLoading(false);  // Imposta lo stato di caricamento su false
      })
      .catch((err) => {
        setError(err);  // Gestisce gli errori
        setLoading(false);  // Imposta lo stato di caricamento su false
      });
  }, []);  // Il secondo argomento vuoto [] assicura che l'effetto venga eseguito solo una volta al montaggio


  const deleteLocazione = async (id) => {
    if (window.confirm('Sei sicuro di voler eliminare questo pezzo?')) {
      try {
        await fetch(`https://a-lservice-production-39a8.up.railway.app/elimina-locazioni-db/${id}`, {
          method: 'DELETE',
        });
        setLocazioni(locazioni.filter(l => l._id !== id));
      } catch (err) {
        alert('Errore durante l\'eliminazione della locazione.');
      }
    }
  };

  return (
    <div className="lista-locazioni">
      <h2>Locazioni</h2>
      <ul>
        {locazioni.map((loc) => (
          <li key={loc.id}>
            {loc.nome}
            <button onClick={() => deleteLocazione(loc._id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaLocazioni;