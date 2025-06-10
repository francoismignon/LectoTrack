import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/ReadingPage.css';

function ReadingPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [reading, setReading] = useState(null);
    const [currentPage, setCurrentPage] = useState('');
    const [comment, setComment] = useState('');
    const [nbrPages, setNbrPages] = useState(''); // Stocker le nombre total de pages

    useEffect(() => {
        async function fetchReading() {
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/readings/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                setReading(response.data);
                setCurrentPage(response.data.currentPage || '');
                setComment(response.data.comment || '');
                // Stocker le nombre de pages du livre
                setNbrPages(response.data.book.nbrPages || '');
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchReading();
    }, [id]);

    async function handleModify() {
        try {
            await axios.patch(`http://localhost:3000/api/v1/readings/${id}`, {
                nbrPages: nbrPages, // Nombre total de pages (fixe)
                pageNbr: currentPage, // Page actuelle
                content: comment // Commentaire
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            
            alert('Lecture mise à jour avec succès !');
            
            // Redirection vers la page de résumé
            navigate(`/resume/${id}`);
            
        } catch (error) {
            console.log('Erreur lors de la mise à jour:', error.message);
            alert('Erreur lors de la mise à jour de la lecture');
        }
    }

    if (!reading) {
        return <div>Chargement...</div>;
    }

    return (
        <div className="container">
            <div className="reading-card">
                {/* Image du livre */}
                <div className="book-cover">
                    <img src={reading.book.coverUrl} alt={reading.book.title} />
                </div>

                {/* Barre de progression avec pourcentage */}
                <div className="progress-section">
                    <div className="progress-bar">
                        <div 
                            className="progress-fill" 
                            style={{ width: `${reading.progress}%` }}
                        ></div>
                    </div>
                    <div className="progress-text">{reading.progress}%</div>
                </div>

                {/* Titre du livre */}
                <h2 className="book-title">{reading.book.title}</h2>

                {/* Auteur */}
                <p className="book-author">{reading.book.author.name}</p>

                {/* Informations sur les pages */}
                <p className="page-info">Pages totales: {nbrPages}</p>

                {/* Numéro de page (input) */}
                <div className="page-input">
                    <label>Page actuelle:</label>
                    <input 
                        type="number" 
                        value={currentPage}
                        onChange={(e) => setCurrentPage(e.target.value)}
                        placeholder="Numéro de page"
                        max={nbrPages}
                        min="0"
                    />
                </div>

                {/* Commentaire (textarea) */}
                <div className="comment-section">
                    <label>Commentaire:</label>
                    <textarea 
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Vos commentaires sur le livre..."
                        rows="4"
                    ></textarea>
                </div>

                {/* Bouton modifier */}
                <button className="modify-button" onClick={handleModify}>
                    Modifier
                </button>
            </div>
        </div>
    );
}

export default ReadingPage;