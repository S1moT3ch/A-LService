import { useState, useEffect } from 'react';
import API from '../api/api.js';
import './style/FormPezzo.css';

const FormPezzo = ({ onSaved }) => {
  const [nome, setNome] = useState('');
  const [quantita, setQuantita] = useState(1);
  const [locazioni, setLocazioni] = useState([]);
  const [locazioneId, setLocazioneId] = useState('');

  const [pezzi, setPezzi] = useState([]); // 👈 Aggiungiamo un array locale

  useEffect(() => {
    API.get('/locazioni').then(res => setLocazioni(res.data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuovoPezzo = { nome, quantita, locazione: locazioneId };

    // Aggiorna pezzi localmente
    setPezzi(prev => [...prev, nuovoPezzo]);

    // Reset del form
    setNome('');
    setQuantita(1);
    setLocazioneId('');
  };

  const inviaAlBackend = async () => {
    try {
      const jsonFile = new Blob([JSON.stringify(pezzi)], { type: 'application/json' });
      const formData = new FormData();
      formData.append('file', jsonFile, 'pezzi.json');
  
      const response = await fetch('/pezzi-json', { // <-- /api/pezzi-json se usi Router
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Errore nell\'invio al server');
      }
  
      alert('Dati inviati con successo!');
    } catch (error) {
      console.error('Errore:', error);
      alert('Errore durante l\'invio.');
    }
  };

  const gestisciSubmit = async (e) => {
    e.preventDefault();
    try {
      const jsonFile = new Blob([JSON.stringify(pezzi)], { type: 'application/json' });
      const formData = new FormData();
      formData.append('file', jsonFile, 'pezzi.json');
  
      const response = await fetch('/pezzi-db', {
        method: 'POST',
        body: formData,
      });

      setPezzi([]);
  
      if (!response.ok) {
        throw new Error('Errore nell\'invio al server');
      }
      
      alert('Dati inviati con successo!');
    } catch (error) {
      console.error('Errore:', error);
      alert('Errore durante l\'invio.');
    }
  };

  return (
    <div className="form-container">
    <form onSubmit={handleSubmit} className="p-4 space-y-3">
      <h2 className="text-xl font-bold">Aggiungi Pezzo</h2>
      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={e => setNome(e.target.value)}
        className="border p-2 w-full"
        required
      />
      <input
        type="number"
        placeholder="Quantità"
        value={quantita}
        min={0}
        onChange={e => setQuantita(Number(e.target.value))} // 👈 Forziamo tipo number
        className="border p-2 w-full"
        required
      />
      <select
        value={locazioneId}
        onChange={e => setLocazioneId(e.target.value)}
        className="border p-2 w-full"
        required
      >
        <option value="">Seleziona locazione</option>
        <option value="Deposito">Deposito</option>
        {locazioni.map(loc => (
          <option key={loc._id} value={loc._id}>
            {loc.nome}
          </option>
        ))}
      </select>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Aggiungi
      </button>
    </form>
    <button
      onClick={gestisciSubmit}
      className="button-save"
      disabled={pezzi.length === 0}
    >
      Salva
    </button>
    </div>
  );
};

export default FormPezzo;