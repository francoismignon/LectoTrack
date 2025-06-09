import React from 'react';
import('../styles/authStyle.css');

function RegisterPage(){
    return (
    <div className="form-container">
      <h2>Inscription</h2>

      <label htmlFor="login">Login</label>
      <input type="text" id="login" placeholder="johndoe" />

      <label htmlFor="password">Mot de passe</label>
      <input type="password" id="password" />

      <label htmlFor="confirm">Mot de passe à nouveau</label>
      <input type="password" id="confirm" />

      <button>Inscription</button>

      <p>Déjà utilisateur ?</p>
      <button>Connexion</button>
    </div>
  );
}
export default RegisterPage;