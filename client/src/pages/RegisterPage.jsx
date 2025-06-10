import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import '../styles/RegisterPage.css';

function RegisterPage() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  function handleClick(){
    navigate('/connexion');
  }

  async function handleSubmit(e){
    e.preventDefault();
    if(password !== confirmPassword){
      alert("Les mots de passe ne correspondent pas !");
      return;
    }
    try {
      const response = await axios.post('http://localhost:3000/api/v1/auth/register', {
        login,
        password,
        confirmPassword
      });
      alert("Inscription réussie");
      navigate('/connexion');
    } catch (error) {
      console.log(error.message);
    }
  }

  function handleConfirmPasswordChange(e){
    const {name, value} = e.target;
    setConfirmPassword(value);
  }
 
  function handlePasswordChange(e){
    const {name, value} = e.target;
    setPassword(value);
  }

  function handleLoginChange(e) {
    const {name, value} = e.target;
    setLogin(value);
  }

  return (
    <div className="container">
      <div className="form-card">
        <h1>Inscription</h1>
        
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="login">Pseudo</label>
            <input onChange={handleLoginChange} type="text" id='login' name='login' required/>
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input onChange={handlePasswordChange} type="password" name="password" id="password" required/>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmation mot de passe</label>
            <input onChange={handleConfirmPasswordChange} type="password" name="confirmPassword" id="confirmPassword" required/>
          </div>

          <input type="submit" value="Inscription" className="btn btn-primary" />
        </form>

        <div className="login-section">
          <label>Déjà inscrit ?</label>
          <input onClick={handleClick} type="button" value="Connexion" className="btn btn-secondary" />
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;