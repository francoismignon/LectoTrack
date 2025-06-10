import React, { useState } from 'react';
import axios from 'axios';
import {Navigate, useNavigate} from 'react-router-dom';

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
    <div>
      <h1>Inscription</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="login">Pseudo</label>
        <input onChange={handleLoginChange} type="text" id='login' name='login' required/>

        <label htmlFor="password">Mot de passe</label>
        <input onChange={handlePasswordChange} type="password" name="password" id="password" required/>

        <label htmlFor="confirmPassword">Confirmation mot de passe</label>
        <input onChange={handleConfirmPasswordChange} type="password" name="confirmPassword" id="confirmPassword" required/>
        <input type="submit" value="Inscription" />
      </form>
      <label>Déja inscrit ?</label>
      <input onClick={handleClick} type="button" value="Connexion" />
    </div>
  );
}

export default RegisterPage;