import { useEffect, useState } from 'react';
import './style/ListaPezzi.css';

const ListaPezzi = () => {
  const [pezzi, setPezzi] = useState([]);  // Stato per i dati
  const [loading, setLoading] = useState(true);  // Stato per il caricamento
  const [error, setError] = useState(null);  // Stato per errori
  const [editPezzoId, setEditPezzoId] = useState(null);
  const [editData, setEditData] = useState({ nome: '', quantita: '', locazione: '' });
  const [locazioni, setLocazioni] = useState([]);

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
    }, []);

  // Carica i dati dal backend quando il componente è montato
  useEffect(() => {
    fetch('https://a-lservice-production-39a8.up.railway.app/pezzi-db')  // Modifica questo URL con quello del tuo backend
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
  
  useEffect(() => {
    setPezzi(prev => prev.map(p => ({ ...p, noleggiato: p.noleggiato || false })));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Sei sicuro di voler eliminare questo pezzo?')) {
      try {
        await fetch(`https://a-lservice-production-39a8.up.railway.app/elimina-pezzi-db/${id}`, {
          method: 'DELETE',
        });
        setPezzi(pezzi.filter(p => p._id !== id));
      } catch (err) {
        alert('Errore durante l\'eliminazione del pezzo.');
      }
    }
  };

  const startEdit = (pezzo) => {
    setEditPezzoId(pezzo._id);
    setEditData({
      nome: pezzo.nome,
      quantita: pezzo.quantita,
      locazione: pezzo.locazione || '',
      noleggiato: pezzo.noleggiato || false
    });
  };

  const toggleNoleggiato = (id) => {
    setPezzi(prev =>
      prev.map(p =>
        p._id === id ? { ...p, noleggiato: !p.noleggiato } : p
      )
    );
  };

  const handleUpdate = async (id) => {
    try {
      const response = await fetch(`https://a-lservice-production-39a8.up.railway.app/pezzi-db/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editData)
      });
  
      if (!response.ok) throw new Error('Errore nel salvataggio');
  
      // aggiorna la lista localmente
      setPezzi(pezzi.map(p => p._id === id ? { ...p, ...editData } : p));
      setEditPezzoId(null); // chiudi la modalità modifica
    } catch (err) {
      alert('Errore durante la modifica');
    }
  };


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
            <th className="th-locazione">Locazione</th>
            <th>Noleggiato</th>
            <th className="th-azioni">Azioni</th>
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
                {editPezzoId === p._id ? (
                <>
              <td>
                <input
                value={editData.nome}
                onChange={(e) => setEditData({ ...editData, nome: e.target.value })}
              />
              </td>
              <td>
                <input
                type="number"
                value={editData.quantita}
                onChange={(e) => setEditData({ ...editData, quantita: e.target.value })}
              />
              </td>
              <td>
                <select
                value={editData.locazione}
                onChange={(e) => setEditData({ ...editData, locazione: e.target.value })}
                >
                  <option value="">Seleziona una locazione</option>
                  {locazioni.map((loc) => (
                    <option key={loc._id} value={loc.nome}>
                      {loc.nome}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <input
                type="checkbox"
                checked={editData.noleggiato}
                onChange={(e) => setEditData({ ...editData, noleggiato: e.target.checked })}
                />
              </td>
              <td>
                <button onClick={() => handleUpdate(p._id)}>💾</button>
                <button onClick={() => setEditPezzoId(null)}>❌</button>
              </td>
              </>
              ) : (
              <>
              <td>{p.nome}</td>
              <td>{p.quantita}</td>
              <td>{p.locazione || 'N/A'}</td>
              <td>
                {p.noleggiato ? (
                <span style={{ color: 'limegreen', fontWeight: 'bold' }}>✅</span>
                ) : (
                <span style={{ color: 'orangered', fontWeight: 'bold' }}>❌</span>
                )}
              </td>
              <td>
                <button onClick={() => startEdit(p)}>✏️</button>
                <button onClick={() => handleDelete(p._id)}>🗑️</button>
              </td>
              </>
              )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListaPezzi;