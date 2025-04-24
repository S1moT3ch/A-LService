import { useEffect, useState } from 'react';
import API from '../api/api';
import './style/ListaPezzi.css';

const ListaPezzi = () => {
  const [pezzi, setPezzi] = useState([]);

  useEffect(() => {
    API.get('/pezzi').then(res => setPezzi(res.data));
  }, []);

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
                <td>{p.locazione?.nome || 'N/A'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListaPezzi;