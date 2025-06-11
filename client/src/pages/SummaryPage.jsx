import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../api';
import '../styles/global.css';

function SummaryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reading, setReading] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const readingResponse = await api.get(`/readings/${id}`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
        });
        setReading(readingResponse.data);

        const commentsResponse = await api.get(`/readings/${id}/comments`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
        });
        
        if (commentsResponse.data && commentsResponse.data.length > 0) {
          setComments(commentsResponse.data[0].comments || []);
        }
      } catch (error) {
        navigate('/bibliotheque');
      }
    }
    fetchData();
  }, [id]);

  if (!reading) return <div>Chargement...</div>;

  return (
    <div className="container">
      <h1>Résumé: {reading.book.title}</h1>
      <button onClick={() => navigate('/bibliotheque')}>Retour</button>
      <button onClick={() => navigate(`/lecture/${id}`)}>Modifier</button>
      
      <div>
        <img src={reading.book.coverUrl} alt={reading.book.title} className="book-cover" />
        <p>Auteur: {reading.book.author.name}</p>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${reading.progress}%` }}></div>
        </div>
        <p>Progression: {reading.progress}%</p>
      </div>
      
      <h2>Commentaires</h2>
      {comments.length > 0 ? (
        comments.map((comment, index) => (
          <div key={index} className="comment">
            <strong>Page {comment.pageNbr}:</strong>
            <p>{comment.content}</p>
          </div>
        ))
      ) : (
        <p>Aucun commentaire</p>
      )}
    </div>
  );
}

export default SummaryPage;