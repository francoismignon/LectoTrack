import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import '../styles/global.css';

function LoginPage() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:3000/api/v1/auth/login', {
        login,
        password
      });
      localStorage.setItem('accessToken', data.token);
      localStorage.setItem('userRole', data.roleId.toString());
      navigate('/bibliotheque');
    } catch (error) {
      alert('Identifiants incorrects');
    }
  }

  return (
    <div className="container">
      <h1>Connexion</h1>
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
        <button type="submit">Se connecter</button>
        <button type="button" className="btn-secondary" onClick={() => navigate('/inscription')}>
          Créer un compte
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
