import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import '../styles/LoginPage.css';

function LoginPage() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();
        try {
            const {data} = await axios.post('http://localhost:3000/api/v1/auth/login', {
                login,
                password
            })
            //si mode de passe incorrect, l'erreur est leve dans axios
            localStorage.setItem('accessToken', data.token);
            localStorage.setItem('userRole', data.roleId.toString());
            navigate('/bibliotheque');
           
        } catch (error) {
            if(error.response.status === 401){
                alert('Identifiants incorrects');
            }
        }
    }

    function handleClick() {
        navigate('/inscription');
    }

    function handlePasswordChange(e) {
        const { name, value } = e.target;
        setPassword(value);
    }

    function handleLoginChange(e) {
        const { name, value } = e.target;
        setLogin(value);
    }

    return (
        <div className="container">
            <div className="form-card">
                <h1>Connexion</h1>
                
                <form onSubmit={handleSubmit} className="form">
                    <div className="form-group">
                        <label htmlFor="login">Pseudo</label>
                        <input onChange={handleLoginChange} value={login} type="text" id='login' name='login' required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Mot de passe</label>
                        <input onChange={handlePasswordChange} value={password} type="password" name="password" id="password" required />
                    </div>

                    <input type="submit" value="Connexion" className="btn btn-primary" />
                </form>

                <div className="register-section">
                    <label>Pas encore inscrit ?</label>
                    <input onClick={handleClick} type="button" value="Inscription" className="btn btn-secondary" />
                </div>
            </div>
        </div>
    );
}

export default LoginPage;