import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/LibraryPage.css';

function LibraryPage() {
    const [reading, setReading] = useState([]);
    const navigate = useNavigate();
    const isAdmin = localStorage.getItem('userRole') === '1';

    useEffect(() => {
        async function fetchReadings() {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/readings', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                setReading(response.data);
            } catch (error) {
                console.log(error.message);
                // Si l'authentification échoue, rediriger vers la connexion
                if (error.response && error.response.status === 401) {
                    handleLogout();
                }
            }
        }
        fetchReadings();
    }, []);

    function handleAddBookClick() {
        navigate('/AjoutLivre');
    }

    function handleReadingClick(readingId) {
        navigate(`/lecture/${readingId}`);
    }

    function handleSummaryClick(readingId) {
        navigate(`/resume/${readingId}`);
    }

    function handleModerationClick() {
        navigate('/moderation');
    }

    function handleLogout() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userRole');
        // IMPORTANT: replace: true empêche le retour en arrière
        navigate('/connexion', { replace: true });
    }

    async function handleDeleteReading(readingId) {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cette lecture ?')) {
            try {
                await axios.delete(`http://localhost:3000/api/v1/readings/${readingId}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                // Rafraîchir la liste des lectures
                setReading(reading.filter(item => item.id !== readingId));
                alert('Lecture supprimée avec succès');
            } catch (error) {
                console.log('Erreur lors de la suppression:', error.message);
                alert('Erreur lors de la suppression de la lecture');
            }
        }
    }

    return (
        <div className="container">
            <div className="library-card">
                <div className="header-section">
                    <h1>Bibliothèque</h1>
                    <div className="header-buttons">
                        {isAdmin && (
                            <button onClick={handleModerationClick} className="btn btn-admin">
                                Modération
                            </button>
                        )}
                        <button onClick={handleLogout} className="btn btn-logout">
                            Déconnexion
                        </button>
                    </div>
                </div>
                
                <button onClick={handleAddBookClick} type="button" className="btn btn-primary add-book-btn">
                    Ajouter un livre
                </button>

                <div className="readings-grid">
                    {reading.map((readingItem) => (
                        <div key={readingItem.id} className="reading-card">
                            <div onClick={() => handleReadingClick(readingItem.id)} className="reading-content">
                                <img src={readingItem.book.coverUrl} alt={readingItem.book.title} />
                                <div className="reading-info">
                                    <h3>{readingItem.book.title}</h3>
                                    <p>Auteur: {readingItem.book.author.name}</p>
                                    <p>Statut: {readingItem.status.name}</p>
                                    <p>Progression: {readingItem.progress}%</p>
                                </div>
                            </div>
                            <div className="reading-actions">
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleSummaryClick(readingItem.id);
                                    }}
                                    className="btn btn-summary"
                                >
                                    Récapitulatif
                                </button>
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteReading(readingItem.id);
                                    }}
                                    className="btn btn-delete"
                                >
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default LibraryPage;