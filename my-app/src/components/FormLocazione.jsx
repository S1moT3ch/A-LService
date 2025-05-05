import { useState } from 'react';
import './style/FormLocazione.css';

const FormLocazione = ({ onSaved }) => {
  const [nome, setNome] = useState('');
  const [errore, setErrore] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nomePulito = nome.trim();

    if (!nomePulito) {
      setErrore('Il nome della locazione è obbligatorio.');
      return;
    }

    try {
      const response = await fetch('http://a-lservice-production-39a8.up.railway.app/locazione-db', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome }),
      });

      if (!response.ok) {
        throw new Error('Errore nella risposta del server');
      }

      setNome('');
      setErrore('');
      if (onSaved) onSaved();
    } catch (error) {
      console.error("Errore nell'invio della locazione:", error);
      setErrore("Si è verificato un errore durante il salvataggio.");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-locazione">
        <h2>Gestione Locazioni</h2>
        <input
          type="text"
          placeholder="Nome locazione"
          value={nome}
          onChange={(e) => {
            setNome(e.target.value);
            if (errore) setErrore(''); // pulisci errore se l'utente digita
          }}
        />
        {errore && <p className="errore">{errore}</p>}
        <button type="submit" disabled={nome === ""}>
          Salva locazione
        </button>
      </form>
    </div>
  );
};

export default FormLocazione;