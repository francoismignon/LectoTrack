import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/ReadingPage.css';

function ReadingPage() {
    const { id } = useParams();
    const [reading, setReading] = useState(null);
    const [currentPage, setCurrentPage] = useState('');
    const [comment, setComment] = useState('');

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
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchReading();
    }, [id]);

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

                {/* Numéro de page (input) */}
                <div className="page-input">
                    <label>Page actuelle:</label>
                    <input 
                        type="number" 
                        value={currentPage}
                        onChange={(e) => setCurrentPage(e.target.value)}
                        placeholder="Numéro de page"
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
                <button className="modify-button">Modifier</button>
            </div>
        </div>
    );
}

export default ReadingPage;