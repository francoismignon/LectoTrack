import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/LibraryPage.css';

function LibraryPage() {
    const [reading, setReading] = useState([]);
    const [pagination, setPagination] = useState({});
    const [selectedFilter, setSelectedFilter] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const isAdmin = localStorage.getItem('userRole') === '1';

    useEffect(() => {
        fetchReadings();
    }, [selectedFilter, currentPage]);

    async function fetchReadings() {
        try {
            // Construire l'URL avec les paramètres
            let url = `http://localhost:3000/api/v1/readings?page=${currentPage}&limit=5`;
            if (selectedFilter) {
                url += `&status=${selectedFilter}`;
            }

            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            
            setReading(response.data.data);
            setPagination(response.data.pagination);
        } catch (error) {
            console.log(error.message);
            // Si l'authentification échoue, rediriger vers la connexion
            if (error.response && error.response.status === 401) {
                handleLogout();
            }
        }
    }

    function handleFilterChange(filter) {
        setSelectedFilter(filter);
        setCurrentPage(1); // Retour à la page 1 quand on change de filtre
    }

    function handlePageChange(page) {
        setCurrentPage(page);
    }

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
                // Recharger les données après suppression
                fetchReadings();
                alert('Lecture supprimée avec succès');
            } catch (error) {
                console.log('Erreur lors de la suppression:', error.message);
                alert('Erreur lors de la suppression de la lecture');
            }
        }
    }

    // Fonction pour générer les numéros de page
    function renderPaginationButtons() {
        const buttons = [];
        const { currentPage, totalPages } = pagination;

        // Bouton Précédent
        if (currentPage > 1) {
            buttons.push(
                <button 
                    key="prev" 
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="btn btn-pagination"
                >
                    ‹ Précédent
                </button>
            );
        }

        // Numéros de page
        for (let i = 1; i <= totalPages; i++) {
            buttons.push(
                <button 
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`btn btn-pagination ${i === currentPage ? 'active' : ''}`}
                >
                    {i}
                </button>
            );
        }

        // Bouton Suivant
        if (currentPage < totalPages) {
            buttons.push(
                <button 
                    key="next"
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="btn btn-pagination"
                >
                    Suivant ›
                </button>
            );
        }

        return buttons;
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

                {/* Section des filtres */}
                <div className="filters-section">
                    <div className="filter-buttons">
                        <button 
                            onClick={() => handleFilterChange(null)}
                            className={`btn btn-filter ${selectedFilter === null ? 'active' : ''}`}
                        >
                            Tous
                        </button>
                        <button 
                            onClick={() => handleFilterChange('Non commencer')}
                            className={`btn btn-filter ${selectedFilter === 'Non commencer' ? 'active' : ''}`}
                        >
                            Non commencé
                        </button>
                        <button 
                            onClick={() => handleFilterChange('En cours')}
                            className={`btn btn-filter ${selectedFilter === 'En cours' ? 'active' : ''}`}
                        >
                            En cours
                        </button>
                        <button 
                            onClick={() => handleFilterChange('Terminé')}
                            className={`btn btn-filter ${selectedFilter === 'Terminé' ? 'active' : ''}`}
                        >
                            Terminé
                        </button>
                    </div>
                    
                    {/* Informations sur les résultats */}
                    {pagination.totalItems !== undefined && (
                        <div className="results-info">
                            {pagination.totalItems} livre(s) trouvé(s)
                            {selectedFilter && ` - Filtre: ${selectedFilter}`}
                        </div>
                    )}
                </div>

                <div className="readings-grid">
                    {reading.map((readingItem) => (
                        <div key={readingItem.id} className="reading-card">
                            <div onClick={() => handleReadingClick(readingItem.id)} className="reading-content">
                                <img src={readingItem.book.coverUrl} alt={readingItem.book.title} />
                                <div className="reading-info">
                                    <h3>{readingItem.book.title}</h3>
                                    <p>Auteur: {readingItem.book.author.name}</p>
                                    <p>Statut: {readingItem.status.name}</p>
                                    
                                    {/* Barre de progression */}
                                    <div className="progress-section">
                                        <div className="progress-bar">
                                            <div 
                                                className="progress-fill" 
                                                style={{ width: `${readingItem.progress}%` }}
                                            ></div>
                                        </div>
                                        <div className="progress-text">{readingItem.progress}%</div>
                                    </div>
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

                {/* Section pagination */}
                {pagination.totalPages > 1 && (
                    <div className="pagination-section">
                        <div className="pagination-buttons">
                            {renderPaginationButtons()}
                        </div>
                        <div className="pagination-info">
                            Page {pagination.currentPage} sur {pagination.totalPages}
                        </div>
                    </div>
                )}

                {/* Message si aucun livre */}
                {reading.length === 0 && (
                    <div className="no-books">
                        {selectedFilter 
                            ? `Aucun livre avec le statut "${selectedFilter}"` 
                            : "Aucun livre dans votre bibliothèque"
                        }
                    </div>
                )}
            </div>
        </div>
    );
}

export default LibraryPage;