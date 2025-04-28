import { useEffect, useState } from 'react';
import API from '../api/api';
import './style/ListaPezzi.css';

const ListaPezzi = () => {
  const [pezzi, setPezzi] = useState([]);  // Stato per i dati
  const [loading, setLoading] = useState(true);  // Stato per il caricamento
  const [error, setError] = useState(null);  // Stato per errori

  // Carica i dati dal backend quando il componente è montato
  useEffect(() => {
    fetch('/pezzi-json')  // Modifica questo URL con quello del tuo backend
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

  if (loading) {
    return <div>Caricamento in corso...</div>;  // Messaggio di caricamento
  }

  if (error) {
    return <div>Errore nel caricamento dei dati: {error.message}</div>;  // Messaggio in caso di errore
  }

  return (
    <div className="lista-container">
      <h2>Lista Pezzi</h2>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Quantità</th>
            <th>Locazione</th>
          </tr>
        </thead>
        <tbody>
          {pezzi.length === 0 ? (
            <tr>
              <td colSpan="3" className="empty-message">Nessun pezzo disponibile</td>
            </tr>
          ) : (
            pezzi.map(p => (
              <tr key={p._id}>
                <td>{p.nome}</td>
                <td>{p.quantita}</td>
                <td>{p.locazione || 'N/A'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListaPezzi;