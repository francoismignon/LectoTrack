import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/SummaryPage.css';

function SummaryPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [reading, setReading] = useState(null);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                // Récupérer les informations du livre
                const readingResponse = await axios.get(`http://localhost:3000/api/v1/readings/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                setReading(readingResponse.data);

                // Récupérer tous les commentaires
                const commentsResponse = await axios.get(`http://localhost:3000/api/v1/readings/${id}/comments`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                
                // Debug : voir ce qui est retourné
                console.log('Réponse comments API:', commentsResponse.data);
                
                // Extraire les commentaires du premier élément du tableau
                if (commentsResponse.data && commentsResponse.data.length > 0) {
                    setComments(commentsResponse.data[0].comments || []);
                } else {
                    setComments([]);
                }

            } catch (error) {
                console.log('Erreur lors du chargement:', error.message);
                // Si l'authentification échoue, rediriger vers la connexion
                if (error.response && error.response.status === 401) {
                    localStorage.removeItem('accessToken');
                    navigate('/connexion');
                }
            }
        }
        fetchData();
    }, [id, navigate]);

    function handleDetailsClick() {
        navigate(`/lecture/${id}`);
    }

    function handleBackToLibrary() {
        navigate('/bibliotheque');
    }

    if (!reading) {
        return <div>Chargement...</div>;
    }

    return (
        <div className="container">
            <div className="summary-layout">
                <div className="header-section">
                    <button onClick={handleBackToLibrary} className="btn btn-back">
                        ← Retour à la bibliothèque
                    </button>
                </div>

                {/* Section gauche - Informations du livre */}
                <div className="book-info-section">
                    {/* Image du livre */}
                    <div className="book-cover">
                        <img src={reading.book.coverUrl} alt={reading.book.title} />
                    </div>

                    {/* Barre de progression */}
                    <div className="progress-section">
                        <div className="progress-bar">
                            <div 
                                className="progress-fill" 
                                style={{ width: `${reading.progress}%` }}
                            ></div>
                        </div>
                        <div className="progress-text">{reading.progress}%</div>
                    </div>

                    {/* Titre et auteur */}
                    <h2 className="book-title">{reading.book.title}</h2>
                    <p className="book-author">{reading.book.author.name}</p>

                    {/* Bouton Détails */}
                    <button className="details-button" onClick={handleDetailsClick}>
                        Détails
                    </button>
                </div>

                {/* Section droite - Récapitulatif des commentaires */}
                <div className="comments-section">
                    <h3 className="comments-title">Récapitulatif</h3>
                    <div className="comments-container">
                        {comments.length > 0 ? (
                            comments.map((comment, index) => (
                                <div key={index} className="comment-item">
                                    <div className="comment-header">
                                        <strong>Page: {comment.pageNbr}</strong>
                                    </div>
                                    <div className="comment-content">
                                        {comment.content}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="no-comments">
                                Aucun commentaire enregistré pour ce livre.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SummaryPage;