import React, { useState } from 'react';
import axios from 'axios';

const FormLocazione = ({ onSaved }) => {
  const [nome, setNome] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nome.trim()) return;
    try {
      await axios.post('/api/locazioni', { nome });
      setNome('');
      onSaved(); // aggiorna la lista
    } catch (err) {
      console.error('Errore durante il salvataggio:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-locazione">
      <input
        type="text"
        placeholder="Nome locazione"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <button type="submit">Salva locazione</button>
    </form>
  );
};

export default FormLocazione;