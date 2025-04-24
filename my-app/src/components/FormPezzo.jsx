import { useState, useEffect } from 'react';
import API from '../api/api';
import './style/FormPezzo.css';

const FormPezzo = ({ onSaved }) => {
  const [nome, setNome] = useState('');
  const [quantita, setQuantita] = useState(1);
  const [locazioni, setLocazioni] = useState([]);
  const [locazioneId, setLocazioneId] = useState('');

  useEffect(() => {
    API.get('/locazioni').then(res => setLocazioni(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post('/pezzi', { nome, quantita, locazione: locazioneId });
    setNome('');
    setQuantita(1);
    setLocazioneId('');
    onSaved();
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
        onChange={e => setQuantita(e.target.value)}
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
        {locazioni.map(loc => (
          <option key={loc._id} value={loc._id}>
            {loc.nome}
          </option>
        ))}
      </select>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Salva
      </button>
    </form>
    </div>
  );
};

export default FormPezzo;