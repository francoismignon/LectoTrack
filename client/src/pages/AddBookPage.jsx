import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/global.css';

function AddBookPage() {
  const [title, setTitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [nbrPages, setNbrPages] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/v1/readings', {
        title,
        coverUrl,
        nbrPages,
        categories: ['livre'],
        authorName
      }, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
      });
      alert('Livre ajouté!');
      navigate('/bibliotheque');
    } catch (error) {
      alert('Erreur lors de l\'ajout');
    }
  }

  async function searchCover(value) {
    if (!value) return;
    try {
      const response = await axios.get(`https://openlibrary.org/search.json?title=${value}`);
      const book = response.data.docs.find(doc => doc.cover_edition_key);
      if (book) {
        setCoverUrl(`https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-M.jpg`);
      }
    } catch (error) {
      console.log('Erreur recherche couverture');
    }
  }

  return (
    <div className="container">
      <h1>Ajouter un livre</h1>
      <button onClick={() => navigate('/bibliotheque')}>Retour</button>
      
      {coverUrl && <img src={coverUrl} alt="Couverture" className="book-cover" />}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Titre</label>
          <input 
            type="text" 
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              searchCover(e.target.value);
            }}
            required 
          />
        </div>
        <div className="form-group">
          <label>Auteur</label>
          <input 
            type="text" 
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            required 
          />
        </div>
        <div className="form-group">
          <label>Nombre de pages</label>
          <input 
            type="number" 
            value={nbrPages}
            onChange={(e) => setNbrPages(e.target.value)}
            min="1"
            required 
          />
        </div>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}

export default AddBookPage;
