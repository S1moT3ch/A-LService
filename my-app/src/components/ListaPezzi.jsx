import { useEffect, useState } from 'react';
import './style/ListaPezzi.css';

const ListaPezzi = () => {
  const [pezzi, setPezzi] = useState([]);  // Stato per i dati
  const [loading, setLoading] = useState(true);  // Stato per il caricamento
  const [error, setError] = useState(null);  // Stato per errori
  const [editPezzoId, setEditPezzoId] = useState(null);
  const [editData, setEditData] = useState({
    nome: '',
    quantita: '',
    locazione: '',
    noleggiato: false,
    noleggiatoA: '',
    quantitaModifica: ''
  });
  const [locazioni, setLocazioni] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [locazioniAnnidate, setLocazioniAnnidate] = useState({});
  // Stato per la scheda attiva
  const [tabAttiva, setTabAttiva] = useState('Globale');

  // Calcola locazioni uniche presenti nei dati
  const locazioniUniche = [...new Set(pezzi.map(p => p.locazione || 'Nessuna locazione'))];

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
      noleggiato: pezzo.noleggiato || false,
      noleggiatoA: pezzo.noleggiatoA || ''
    });
  };


  const handleUpdate = async (id) => {
  const pezzoOriginale = pezzi.find(p => p._id === id);
  const quantitaModifica = parseInt(editData.quantitaModifica || pezzoOriginale.quantita);
  const nuovaQuantita = isNaN(quantitaModifica) ? pezzoOriginale.quantita : quantitaModifica;
  // Verifica se ci sono cambiamenti nei dati
  const nomeDiverso = editData.nome !== pezzoOriginale.nome;
  const quantitaDiversa = nuovaQuantita !== pezzoOriginale.quantita;
  const locazioneDiversa = editData.locazione !== pezzoOriginale.locazione;
  const noleggioDiverso = editData.noleggiato !== pezzoOriginale.noleggiato;

  // Se ci sono cambiamenti rilevanti (nome, quantità, locazione, noleggio)
  if (nomeDiverso || quantitaDiversa || locazioneDiversa || noleggioDiverso) {
    // Se la locazione è cambiata e la quantità è stata ridotta
    if (locazioneDiversa && nuovaQuantita < pezzoOriginale.quantita) {
      const quantitaRimanente = pezzoOriginale.quantita - nuovaQuantita;
      const payload = {
        idOriginale: id,
        nuovaQuantita: nuovaQuantita,
        nuovaLocazione: editData.locazione,
        quantitaRimanente: quantitaRimanente,
        noleggiato: editData.noleggiato, // Aggiungi il controllo sul noleggio
        noleggiatoA: editData.noleggiatoA // Aggiungi a chi è stato noleggiato (se applicabile)
      };

      try {
        const response = await fetch('https://a-lservice-production-39a8.up.railway.app/pezzi-db/sposta-pezzo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!response.ok) throw new Error('Errore nello spostamento');

        const updatedList = await response.json();
        setPezzi(updatedList);
        setEditPezzoId(null);
      } catch (err) {
        alert('Errore durante lo spostamento del pezzo.');
      }

    } else if (editData.noleggiato && nuovaQuantita < pezzoOriginale.quantita) {
  const quantitaRimanente = pezzoOriginale.quantita - nuovaQuantita;
  const payload = {
    idOriginale: id,
    nuovaQuantita: nuovaQuantita,
    locazioneOriginale: pezzoOriginale.locazione,
    nuovaLocazione: editData.locazione || pezzoOriginale.locazione, // fallback se non cambiata
    quantitaRimanente: quantitaRimanente,
    noleggiato: true,
    noleggiatoA: editData.noleggiatoA,
    nome: pezzoOriginale.nome
  };

  try {
    const response = await fetch('https://a-lservice-production-39a8.up.railway.app/pezzi-db/noleggia-pezzo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error('Errore nel noleggio');

    const updatedList = await response.json();
    setPezzi(updatedList);
    setEditPezzoId(null);
  } catch (err) {
    alert('Errore durante il noleggio del pezzo.');
  }} else {

      
      // Comportamento standard: aggiorna i dati del pezzo
      try {
        const response = await fetch(`https://a-lservice-production-39a8.up.railway.app/pezzi-db/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(editData)
        });

        if (!response.ok) throw new Error('Errore nel salvataggio');

        // Aggiorna il pezzo nella lista
        setPezzi(pezzi.map(p => p._id === id ? { ...p, ...editData } : p));
        setEditPezzoId(null);
      } catch (err) {
        alert('Errore durante la modifica');
      }
    }
  } else {
    alert('Nessun cambiamento da salvare');
  }
};

const handleClickLocazione = (locazioneNome, idPezzo) => {
  const pezzoTrovato = pezzi.find(p => p.nome === locazioneNome);
  if (pezzoTrovato && pezzoTrovato.locazione) {
    setLocazioniAnnidate(prev => ({
      ...prev,
      [idPezzo]: pezzoTrovato.locazione
    }));
  } else {
    // Nasconde se clicchi e non esiste o è già visibile
    setLocazioniAnnidate(prev => {
      const copy = { ...prev };
      delete copy[idPezzo];
      return copy;
    });
  }
};

const locazioniAnnidabili = new Set(
  pezzi
    .filter(p => p.locazione && pezzi.some(other => other.nome === p.locazione && other.locazione))
    .map(p => p.locazione)
);

// Raggruppa quantità per locazione
const totaliPerLocazione = pezzi.reduce((acc, pezzo) => {
  const loc = pezzo.locazione || 'Nessuna locazione';
  acc[loc] = (acc[loc] || 0) + pezzo.quantita;
  return acc;
}, {});

// Totale generale
const totaleGlobale = pezzi.reduce((acc, pezzo) => acc + pezzo.quantita, 0);

// Filtra i pezzi in base alla scheda attiva
const pezziFiltrati = tabAttiva === 'Globale'
  ? pezzi
  : pezzi.filter(p => (p.locazione || 'Nessuna locazione') === tabAttiva);

  if (loading) {
    return <div>Caricamento in corso...</div>;  // Messaggio di caricamento
  }

  if (error) {
    return <div>Errore nel caricamento dei dati: {error.message}</div>;  // Messaggio in caso di errore
  }

  return (
    <div className="lista-container">
      <h2>Lista Pezzi</h2>
      <div className="search-bar">
        <input
        type="text"
        placeholder="Cerca per nome..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="tab-bar">
        <button
          className={tabAttiva === 'Globale' ? 'active-tab' : ''}
          onClick={() => setTabAttiva('Globale')}
          >
          Tutti i pezzi
        </button>
        {locazioniUniche.map(loc => (
          <button
            key={loc}
            className={tabAttiva === loc ? 'active-tab' : ''}
            onClick={() => setTabAttiva(loc)}
            >
            📦 {loc}
          </button>
          ))}
      </div>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Quantità</th>
            <th className="th-locazione">Locazione</th>
            <th className="th-noleggiato">Noleggiato</th>
            <th className="th-azioni">Azioni</th>
          </tr>
        </thead>
        <tbody>
          {pezzi.length === 0 ? (
            <tr>
              <td colSpan="3" className="empty-message">Nessun pezzo disponibile</td>
            </tr>
          ) : (
            pezziFiltrati
            .filter(p => p.nome.toLowerCase().includes(searchTerm.toLowerCase()))
            .map(p => (
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
                <div style={{ marginBottom: '4px' }}>Totale: {p.quantita}</div>
                <input
                type="number"
                placeholder="Quantità da modificare"
                value={editData.quantitaModifica || ''}
                onChange={(e) => setEditData({ ...editData, quantitaModifica: e.target.value })}
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
              <td className="th-noleggiato">
                  <input
                  type="checkbox"
                  checked={editData.noleggiato}
                  onChange={(e) =>
                    setEditData({
                    ...editData,
                    noleggiato: e.target.checked,
                    noleggiatoA: e.target.checked ? editData.noleggiatoA : '' // pulisci se deselezionato
                    })
                  }
                  />
                {editData.noleggiato && (
                <input
                type="text"
                placeholder="A chi?"
                value={editData.noleggiatoA}
                onChange={(e) =>
                setEditData({ ...editData, noleggiatoA: e.target.value })
                }
                style={{ marginTop: '4px', display: 'block', width: '100%' }}
                />
                )}
              </td>
              <td>
                <button className="btn-verde" onClick={() => handleUpdate(p._id)}>💾</button>
                <button className="btn-blu" onClick={() => setEditPezzoId(null)}>❌</button>
              </td>
              </>
              ) : (
              <>
              <td>{p.nome}</td>
              <td>{p.quantita}</td>
              <td>
                {locazioniAnnidabili.has(p.locazione) ? (
                <span
                  onClick={() => handleClickLocazione(p.locazione, p._id)}
                  style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                  title="Clicca per vedere la locazione annidata"
                >
                {p.locazione}
                </span>
                ) : (
                <span>{p.locazione || 'N/A'}</span>
                )}
                {locazioniAnnidate[p._id] && (
                  <div style={{ marginTop: '4px', fontSize: '0.9em', color: 'gray' }}>
                    ↳ <strong>{locazioniAnnidate[p._id]}</strong>
                  </div>
                  )}
              </td>
              <td className="th-noleggiato">
                {p.noleggiato ? (
                <span style={{ color: 'limegreen', fontWeight: 'bold' }}>
                  ✅ {p.noleggiatoA ? `${p.noleggiatoA}` : ''}
                </span>
              ) : (
                <span style={{ color: 'orangered', fontWeight: 'bold' }}>❌</span>
                )}
              </td>
              <td>
                <button className="btn-verde" onClick={() => startEdit(p)}>✏️</button>
                <button className="btn-blu" onClick={() => handleDelete(p._id)}>🗑️</button>
              </td>
              </>
              )}
              </tr>
            ))
          )}
        </tbody>
        {searchTerm === '' && (
        <tfoot>
          {Object.entries(totaliPerLocazione).map(([locazione, quantita]) => (
          <tr key={locazione} className="summary-row">
            <td colSpan="1" style={{ fontWeight: 'bold' }}>Totale in "{locazione}"</td>
            <td colSpan="4">{quantita}</td>
          </tr>
          ))}
          <tr className="summary-total-global">
            <td colSpan="1" style={{ fontWeight: 'bold', background: '#eee' }}>Totale complessivo</td>
            <td colSpan="4" style={{ background: '#eee' }}>{totaleGlobale}</td>
          </tr>
          <tr>
            <td colSpan="5" style={{ textAlign: 'right', fontWeight: 'bold', paddingTop: '10px' }}>
              Totale righe mostrate: {
              pezzi.filter(p => p.nome.toLowerCase().includes(searchTerm.toLowerCase())).length
              }
            </td>
        </tr>
        </tfoot>
        )}
      </table>
    </div>
  );
};

export default ListaPezzi;