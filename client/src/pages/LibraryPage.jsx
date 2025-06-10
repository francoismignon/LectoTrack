import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/LibraryPage.css';

function LibraryPage() {
    const [reading, setReading] = useState([]);
    const navigate = useNavigate();

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
            }
        }
        fetchReadings();
    }, []);

    function handleClick() {
        navigate('/AjoutLivre');
    }

    function handleReadingClick(readingId) {
        navigate(`/lecture/${readingId}`);
    }

    return (
        <div className="container">
            <div className="library-card">
                <h1>Bibliothèque</h1>
                
                <button onClick={handleClick} type="button" className="btn btn-primary add-book-btn">
                    Ajouter un livre
                </button>

                <div className="readings-grid">
                    {reading.map((readingItem) => (
                        <div 
                            key={readingItem.id} 
                            className="reading-card"
                            onClick={() => handleReadingClick(readingItem.id)}
                        >
                            <img src={readingItem.book.coverUrl} alt={readingItem.book.title} />
                            <div className="reading-info">
                                <h3>{readingItem.book.title}</h3>
                                <p>Auteur: {readingItem.book.author.name}</p>
                                <p>Statut: {readingItem.status.name}</p>
                                <p>Progression: {readingItem.progress}%</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default LibraryPage;