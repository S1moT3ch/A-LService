import { useEffect, useState } from 'react';
import './style/ListaPezzi.css';

const ListaPezzi = () => {
  const [pezzi, setPezzi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [locazioni, setLocazioni] = useState([]);
  const [expandedCards, setExpandedCards] = useState({ global: true });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pezziRes, locazioniRes] = await Promise.all([
          fetch('https://a-lservice-production-39a8.up.railway.app/pezzi-db'),
          fetch('https://a-lservice-production-39a8.up.railway.app/locazione-db')
        ]);
        const [pezziData, locazioniData] = await Promise.all([
          pezziRes.json(),
          locazioniRes.json()
        ]);
        setPezzi(pezziData);
        setLocazioni(locazioniData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleCard = (key) => {
    setExpandedCards(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const pezziFiltrati = searchTerm
    ? pezzi.filter(p => p.nome.toLowerCase().includes(searchTerm.toLowerCase()))
    : pezzi;

  const gruppiPerLocazione = pezziFiltrati.reduce((acc, pezzo) => {
    const loc = pezzo.locazione || 'Nessuna locazione';
    if (!acc[loc]) acc[loc] = [];
    acc[loc].push(pezzo);
    return acc;
  }, {});

  const renderTabella = (pezziDaMostrare) => (
    <table className="tabella-pezzi">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Quantità</th>
          <th>Locazione</th>
          <th>Noleggiato</th>
        </tr>
      </thead>
      <tbody>
        {pezziDaMostrare.map(p => (
          <tr key={p._id}>
            <td>{p.nome}</td>
            <td>{p.quantita}</td>
            <td>{p.locazione || 'N/A'}</td>
            <td>{p.noleggiato ? `✅ ${p.noleggiatoA || ''}` : '❌'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  if (loading) return <div>Caricamento in corso...</div>;
  if (error) return <div>Errore: {error.message}</div>;

  return (
    <div className="lista-container">
      <h2>Lista Pezzi</h2>

      <input
        type="text"
        placeholder="Cerca per nome..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      <div className="schede-container">
        {/* Scheda globale */}
        <div className="scheda">
          <div className="scheda-header" onClick={() => toggleCard('global')}>
            <h3>Tutti i pezzi</h3>
          </div>
          {expandedCards['global'] && renderTabella(pezziFiltrati)}
        </div>

        {/* Schede per locazione */}
        {Object.entries(gruppiPerLocazione).map(([locazione, pezziLocazione]) => (
          <div className="scheda" key={locazione}>
            <div className="scheda-header" onClick={() => toggleCard(locazione)}>
              <h3>{locazione}</h3>
            </div>
            {expandedCards[locazione] && renderTabella(pezziLocazione)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaPezzi;
