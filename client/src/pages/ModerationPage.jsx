import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { useNavigate } from 'react-router-dom';
import '../styles/global.css';

function ModerationPage() {
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchComments();
  }, []);

  async function fetchComments() {
    try {
      const response = await api.get('/comments', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
      });
      setComments(response.data);
    } catch (error) {
      navigate('/bibliotheque');
    }
  }

  async function moderateComment(id) {
    if (confirm('Modérer ce commentaire?')) {
      try {
        await api.patch(`http://localhost:3000/api/v1/comments/${id}`, {}, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
        });
        fetchComments();
        alert('Commentaire modéré');
      } catch (error) {
        alert('Erreur lors de la modération');
      }
    }
  }

  return (
    <div className="container">
      <h1>Modération</h1>
      <button onClick={() => navigate('/bibliotheque')}>Retour</button>
      
      <p>Total: {comments.length} commentaires</p>
      
      {comments.map(comment => (
        <div key={comment.id} className="comment">
          <strong>ID: {comment.id}</strong>
          <p>{comment.content}</p>
          <button className="btn-danger" onClick={() => moderateComment(comment.id)}>
            Modérer
          </button>
        </div>
      ))}
    </div>
  );
}

export default ModerationPage;
