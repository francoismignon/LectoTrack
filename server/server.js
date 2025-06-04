const express = require('express');
const env = require('dotenv');
const db = require('./src/models');
const UserRepository = require('./src/Repositories/UserRepository');
const AuthService = require('./src/services/AuthService');


env.config();
const app = express();
app.use(express.json());//pour lire le requ.body en JSON
const PORT = process.env.PORT;
const userRepository = new UserRepository(db.User);
const authService = new AuthService(userRepository);


//Routes
app.post("/api/v1/auth/register", async (req, res)=>{
    const {login, password, confirmPassword} = req.body;
    
    try {
        const newUser = await authService.create(login, password, confirmPassword); 
        res.status(201).json(newUser);

    } catch (error) {
        res.status(error.statusCode || 500).json({error:error.message});
    } 
});

app.listen(PORT, ()=>{
    console.log(`Le serveur a démarrer sur : http://localhost:${PORT}`);
});