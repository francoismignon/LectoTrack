import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/global.css';

function LibraryPage() {
  const [readings, setReadings] = useState([]);
  const [filter, setFilter] = useState(null);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem('userRole') === '1';

  useEffect(() => {
    fetchReadings();
  }, [filter, page]);

  async function fetchReadings() {
    try {
      let url = `http://localhost:3000/api/v1/readings?page=${page}&limit=5`;
      if (filter) url += `&status=${filter}`;

      const response = await axios.get(url, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
      });
      setReadings(response.data.data);
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
        <button className={!filter ? 'active' : ''} onClick={() => setFilter(null)}>Tous</button>
        <button className={filter === 'Non commencer' ? 'active' : ''} onClick={() => setFilter('Non commencer')}>Non commencé</button>
        <button className={filter === 'En cours' ? 'active' : ''} onClick={() => setFilter('En cours')}>En cours</button>
        <button className={filter === 'Terminé' ? 'active' : ''} onClick={() => setFilter('Terminé')}>Terminé</button>
      </div>

      {readings.map(reading => (
        <div key={reading.id} className="book-item">
          <img src={reading.book.coverUrl} alt={reading.book.title} className="book-cover" />
          <h3>{reading.book.title}</h3>
          <p>Auteur: {reading.book.author.name}</p>
          <p>Statut: {reading.status.name}</p>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${reading.progress}%` }}></div>
          </div>
          <p>{reading.progress}%</p>
          <button onClick={() => navigate(`/lecture/${reading.id}`)}>Lire</button>
          <button onClick={() => navigate(`/resume/${reading.id}`)}>Résumé</button>
          <button className="btn-danger" onClick={() => deleteReading(reading.id)}>Supprimer</button>
        </div>
      ))}

      <div>
        <button onClick={() => setPage(p => Math.max(1, p - 1))}>Page précédente</button>
        <span>Page {page}</span>
        <button onClick={() => setPage(p => p + 1)}>Page suivante</button>
      </div>
    </div>
  );
}

export default LibraryPage;