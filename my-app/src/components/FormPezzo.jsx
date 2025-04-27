import { useState, useEffect } from 'react';
import API from '../api/api.js';
import './style/FormPezzo.css';

const FormPezzo = ({ onSaved }) => {
  const [nome, setNome] = useState('');
  const [quantita, setQuantita] = useState(1);
  const [locazioni, setLocazioni] = useState([]);
  const [locazioneId, setLocazioneId] = useState('');

  const [pezzi, setPezzi] = useState('test'); // 👈 Aggiungiamo un array locale

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
      await API.post('/pezzi-json', pezzi); // 👈 Invia tutto l'array pezzi
      alert('JSON inviato al server!');
      onSaved();
      setPezzi([]); // svuota dopo aver inviato
    } catch (err) {
      console.error(err);
      alert('Errore nell\'invio');
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

    {/* Pulsante per inviare tutto */}
    <button 
      onClick={inviaAlBackend}
      className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
      disabled={pezzi.length === 0}
    >
      Invia JSON al server
    </button>
    </div>
  );
};

export default FormPezzo;