const express = require('express');
const env = require('dotenv');
const authRoutes = require('./src/routes/AuthRoutes.js');
const db = require('./src/models');
const bcrypt = require('bcrypt');
const UserRepository = require('./src/Repositories/UserRepository.js');
const AuthService = require('./src/services/AuthService.js');
const AuthController = require('./src/controllers/AuthController.js');
const jwt = require('jsonwebtoken');




env.config();
const app = express();
app.use(express.json());//pour lire le requ.body en JSON
const PORT = process.env.PORT;
const saltRound = 10;
const userRepository = new UserRepository(db.User);
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

//middleware
function checkToken(req, res, next) {
    try {
        //on verifie si le token de l'utilisateur present
        const authHeader = req.headers.authorization;
        //si non => message d'erreur 
        if (!authHeader) {
            const err = new Error("Token manquant");
            err.statusCode = 401;
            throw err;
        }
        //on verifie si le token de l'utilisateur valide
        const token = authHeader.split(' ')[1]//on decoupe la chaine en deux en utilisant l'espace comme "pivot", on selectionne l'index 1 du tableau

        //on decode le token avec la methode verify de jwt
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            const err = new Error("token invalide");
            err.statusCode = 403;
            throw err;
        }
        //on injecte le token valide dans la requete
        req.user = decoded;
        next();//middleware suivant ou bien route

    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
}

app.get("/api/v1/readings", checkToken, (req, res)=>{
    const {id, login} = req.user;
    res.status(201).json({
        message:`${login} est connecter`
    })
});

//Routes Auth
app.use("/api/v1/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`Le serveur a démarrer sur : http://localhost:${PORT}`);
});