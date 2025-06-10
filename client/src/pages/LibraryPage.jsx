import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/global.css';

function LibraryPage() {
  const [readings, setReadings] = useState([]);
  const [pagination, setPagination] = useState({});
  const [filter, setFilter] = useState(null);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem('userRole') === '1';

  useEffect(() => {
    fetchReadings();
  }, [filter, page]);

  async function fetchReadings() {
    try {
      let url = `http://localhost:3000/api/v1/readings?page=${page}&limit=4`;
      if (filter) url += `&status=${filter}`;

      const response = await axios.get(url, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
      });
      setReadings(response.data.data);
      setPagination(response.data.pagination);
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.clear();
        navigate('/connexion');
      }
    }
  }

  async function deleteReading(id) {
    if (confirm('Supprimer cette lecture?')) {
      try {
        await axios.delete(`http://localhost:3000/api/v1/readings/${id}`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
        });
        fetchReadings();
      } catch (error) {
        alert('Erreur lors de la suppression');
      }
    }
  }

  return (
    <div className="container">
      <h1>Ma Bibliothèque</h1>
      
      <div>
        <button onClick={() => navigate('/AjoutLivre')}>Ajouter un livre</button>
        {isAdmin && <button onClick={() => navigate('/moderation')}>Modération</button>}
        <button className="btn-danger" onClick={() => {
          localStorage.clear();
          navigate('/connexion');
        }}>Déconnexion</button>
      </div>

      <div className="filter-buttons">
        <button className={!filter ? 'active' : ''} onClick={() => {setFilter(null); setPage(1);}}>Tous</button>
        <button className={filter === 'Non commencer' ? 'active' : ''} onClick={() => {setFilter('Non commencer'); setPage(1);}}>Non commencé</button>
        <button className={filter === 'En cours' ? 'active' : ''} onClick={() => {setFilter('En cours'); setPage(1);}}>En cours</button>
        <button className={filter === 'Terminé' ? 'active' : ''} onClick={() => {setFilter('Terminé'); setPage(1);}}>Terminé</button>
      </div>

      <table style={{width: '100%', borderCollapse: 'collapse'}}>
        <thead>
          <tr style={{borderBottom: '1px solid #ddd'}}>
            <th style={{textAlign: 'left', padding: '10px'}}>Couverture</th>
            <th style={{textAlign: 'left', padding: '10px'}}>Titre</th>
            <th style={{textAlign: 'left', padding: '10px'}}>Auteur</th>
            <th style={{textAlign: 'left', padding: '10px'}}>Statut</th>
            <th style={{textAlign: 'left', padding: '10px'}}>Progression</th>
            <th style={{textAlign: 'left', padding: '10px'}}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {readings.map(reading => (
            <tr key={reading.id} style={{borderBottom: '1px solid #eee'}}>
              <td style={{padding: '10px'}}>
                <img src={reading.book.coverUrl} alt={reading.book.title} style={{width: '50px', height: '75px', objectFit: 'cover'}} />
              </td>
              <td style={{padding: '10px'}}>{reading.book.title}</td>
              <td style={{padding: '10px'}}>{reading.book.author.name}</td>
              <td style={{padding: '10px'}}>{reading.status.name}</td>
              <td style={{padding: '10px'}}>
                <div className="progress-bar" style={{width: '100px', display: 'inline-block'}}>
                  <div className="progress-fill" style={{ width: `${reading.progress}%` }}></div>
                </div>
                <span style={{marginLeft: '10px'}}>{reading.progress}%</span>
              </td>
              <td style={{padding: '10px'}}>
                <button onClick={() => navigate(`/lecture/${reading.id}`)}>Lire</button>
                <button onClick={() => navigate(`/resume/${reading.id}`)}>Résumé</button>
                <button className="btn-danger" onClick={() => deleteReading(reading.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {readings.length === 0 && <p>Aucun livre trouvé</p>}

      <div style={{marginTop: '20px'}}>
        <button 
          onClick={() => setPage(p => Math.max(1, p - 1))} 
          disabled={page === 1}
        >
          Page précédente
        </button>
        <span style={{margin: '0 10px'}}>
          Page {pagination.currentPage || page} sur {pagination.totalPages || 1}
        </span>
        <button 
          onClick={() => setPage(p => p + 1)} 
          disabled={!pagination.totalPages || page >= pagination.totalPages}
        >
          Page suivante
        </button>
      </div>
    </div>
  );
}

export default LibraryPage;