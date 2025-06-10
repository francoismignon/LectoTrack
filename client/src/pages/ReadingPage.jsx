import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/global.css';

function ReadingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reading, setReading] = useState(null);
  const [currentPage, setCurrentPage] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    async function fetchReading() {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/readings/${id}`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
        });
        setReading(response.data);
        setCurrentPage(response.data.currentPage || '');
        setComment(response.data.comment || '');
      } catch (error) {
        navigate('/bibliotheque');
      }
    }
    fetchReading();
  }, [id]);

  async function handleUpdate() {
    try {
      await axios.patch(`http://localhost:3000/api/v1/readings/${id}`, {
        nbrPages: reading.book.nbrPages,
        pageNbr: currentPage,
        content: comment
      }, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
      });
      alert('Mis à jour!');
      navigate(`/resume/${id}`);
    } catch (error) {
      alert('Erreur lors de la mise à jour');
    }
  }

  if (!reading) return <div>Chargement...</div>;

  return (
    <div className="container">
      <h1>{reading.book.title}</h1>
      <button onClick={() => navigate('/bibliotheque')}>Retour</button>
      
      <img src={reading.book.coverUrl} alt={reading.book.title} className="book-cover" />
      <p>Auteur: {reading.book.author.name}</p>
      <p>Pages totales: {reading.book.nbrPages}</p>
      
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${reading.progress}%` }}></div>
      </div>
      <p>Progression: {reading.progress}%</p>
      
      <div className="form-group">
        <label>Page actuelle</label>
        <input 
          type="number" 
          value={currentPage}
          onChange={(e) => setCurrentPage(e.target.value)}
          max={reading.book.nbrPages}
          min="0"
        />
      </div>
      
      <div className="form-group">
        <label>Commentaire</label>
        <textarea 
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="4"
        />
      </div>
      
      <button onClick={handleUpdate}>Enregistrer</button>
    </div>
  );
}

export default ReadingPage;