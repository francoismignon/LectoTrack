import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/ModerationPage.css';

function ModerationPage() {
    const [comments, setComments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchComments() {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/comments', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                setComments(response.data);
            } catch (error) {
                console.log('Erreur lors du chargement:', error.message);
                if (error.response && error.response.status === 401) {
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('userRole');
                    navigate('/connexion');
                }
            }
        }
        fetchComments();
    }, [navigate]);

    async function handleDeleteComment(commentId) {
        if (window.confirm('Êtes-vous sûr de vouloir modérer ce commentaire ?')) {
            try {
                await axios.patch(`http://localhost:3000/api/v1/comments/${commentId}`, {}, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                
                // Recharger la liste pour voir le commentaire générique
                const response = await axios.get('http://localhost:3000/api/v1/comments', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                setComments(response.data);
                alert('Commentaire modéré avec succès');
            } catch (error) {
                console.log('Erreur lors de la modération:', error.message);
                alert('Erreur lors de la modération du commentaire');
            }
        }
    }

    function handleBackToLibrary() {
        navigate('/bibliotheque');
    }

    return (
        <div className="container">
            <div className="moderation-card">
                <div className="header-section">
                    <button onClick={handleBackToLibrary} className="btn btn-back">
                        ← Retour à la bibliothèque
                    </button>
                </div>

                <h1>Modération des commentaires</h1>
                <p className="subtitle">Total: {comments.length} commentaires</p>

                <div className="comments-list">
                    {comments.length > 0 ? (
                        comments.map((comment) => (
                            <div key={comment.id} className="comment-item">
                                <div className="comment-content">
                                    <strong>ID: {comment.id}</strong>
                                    <p>{comment.content}</p>
                                </div>
                                <button 
                                    onClick={() => handleDeleteComment(comment.id)}
                                    className="btn btn-moderate"
                                >
                                    Modérer
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="no-comments">
                            Aucun commentaire trouvé.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ModerationPage;