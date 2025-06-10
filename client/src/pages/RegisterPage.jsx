import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/global.css';

function RegisterPage() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas!");
      return;
    }
    try {
      await axios.post('http://localhost:3000/api/v1/auth/register', {
        login,
        password,
        confirmPassword
      });
      alert("Inscription réussie");
      navigate('/connexion');
    } catch (error) {
      alert("Erreur lors de l'inscription");
    }
  }

  return (
    <div className="container">
      <h1>Inscription</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Pseudo</label>
          <input 
            type="text" 
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required 
          />
        </div>
        <div className="form-group">
          <label>Mot de passe</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </div>
        <div className="form-group">
          <label>Confirmer mot de passe</label>
          <input 
            type="password" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required 
          />
        </div>
        <button type="submit">S'inscrire</button>
        <button type="button" className="btn-secondary" onClick={() => navigate('/connexion')}>
          Déjà inscrit? Connexion
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
