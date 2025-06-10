import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/AddBookPages.css';

function AddBookPages() {
    const [title, setTitle] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [coverUrl, setCoverUrl] = useState('');
    const [nbrPages, setNbrPages] = useState('');
    const [categories, setCategories] = useState(['livre']);
    let searchTimeout;
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const { reading } = await axios.post('http://localhost:3000/api/v1/readings', {
                title,
                coverUrl,
                nbrPages,
                categories,
                authorName
            },
            {
                headers:{
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            alert('Le livre a bien été ajouté a vos lectures');
            navigate('/bibliotheque');
        } catch (error) {
            console.log(error.message);
            // Si l'authentification échoue, rediriger vers la connexion
            if (error.response && error.response.status === 401) {
                localStorage.removeItem('accessToken');
                navigate('/connexion');
            }
        }
    }

    async function handleTitleChange(e) {
        const value = e.target.value;
        setTitle(value);
        // Annule la recherche précédente
        clearTimeout(searchTimeout);
        // Lance une nouvelle recherche dans 500ms
        searchTimeout = setTimeout(async () => {
            if (!value) return;
            try {
                const bookUrl = await axios.get("https://openlibrary.org/search.json", {
                    params: { title: value }
                });
                const doc = bookUrl.data.docs.find(doc => doc.cover_edition_key);
                if (doc) {
                    const bookCoverURL = `https://covers.openlibrary.org/b/olid/${doc.cover_edition_key}-M.jpg`;
                    setCoverUrl(bookCoverURL);
                }
            } catch (error) {
                console.log(error.message);
            }
        }, 500);
    }

    function handleAuthorChange(e) {
        const value = e.target.value;
        setAuthorName(value);
    }

    function handleNbrPagesChange(e) {
        const value = e.target.value;
        setNbrPages(value);
    }

    function handleBackToLibrary() {
        navigate('/bibliotheque');
    }

    return (
        <div className="container">
            <div className="form-card">
                <div className="header-section">
                    <button onClick={handleBackToLibrary} className="btn btn-back">
                        ← Retour à la bibliothèque
                    </button>
                </div>
                
                <h1>Ajouter un livre</h1>
                
                {coverUrl && (
                    <div className="book-cover">
                        <img src={coverUrl} alt="couverture" />
                    </div>
                )}

                <form onSubmit={handleSubmit} className="form">
                    <div className="form-group">
                        <label>Titre</label>
                        <input
                            type="text"
                            value={title}
                            onChange={handleTitleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Auteur</label>
                        <input
                            type="text"
                            value={authorName}
                            onChange={handleAuthorChange} 
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Nombre de pages</label>
                        <input
                            type="number"
                            value={nbrPages}
                            onChange={handleNbrPagesChange}
                            min="1"
                            required
                        />
                    </div>

                    <input type="submit" value="Ajouter livre" className="btn btn-primary" />
                </form>
            </div>
        </div>
    );
}

export default AddBookPages;