import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListaLocazioni = ({ refreshTrigger }) => {
  const [locazioni, setLocazioni] = useState([]);

  useEffect(() => {
    fetch('/locazione-db')  // Modifica questo URL con quello del tuo backend
      .then((response) => response.json())  // Converte la risposta in JSON
      .then((data) => {
        setPezzi(data);  // Imposta i dati nel state
        setLoading(false);  // Imposta lo stato di caricamento su false
      })
      .catch((err) => {
        setError(err);  // Gestisce gli errori
        setLoading(false);  // Imposta lo stato di caricamento su false
      });
  }, []);  // Il secondo argomento vuoto [] assicura che l'effetto venga eseguito solo una volta al montaggio


  const deleteLocazione = async (id) => {
    try {
      await axios.delete(`/api/locazioni/${id}`);
      setLocazioni(locazioni.filter((loc) => loc.id !== id));
    } catch (err) {
      console.error('Errore nella cancellazione:', err);
    }
  };

  return (
    <div className="lista-locazioni">
      <h2>Locazioni</h2>
      <ul>
        {locazioni.map((loc) => (
          <li key={loc.id}>
            {loc.nome}
            <button onClick={() => deleteLocazione(loc.id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaLocazioni;