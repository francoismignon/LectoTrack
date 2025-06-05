const express = require('express');
const env = require('dotenv');
const authRoutes = require('./src/routes/AuthRoutes.js');
const db = require('./src/models');
const bcrypt = require('bcrypt');
const UserRepository = require('./src/Repositories/UserRepository.js');
const AuthService = require('./src/services/AuthService.js');
const AuthController = require('./src/controllers/AuthController.js');




env.config();
const app = express();
app.use(express.json());//pour lire le requ.body en JSON
const PORT = process.env.PORT;
const saltRound = 10;
const userRepository = new UserRepository(db.User);
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

//Routes Auth
app.use("/api/v1/auth", authRoutes);

app.post("/api/v1/auth/logout", (req, res)=>{
    //suppression du token jwt coté client
    res.status(200).json({
        message: "Deconnecter avec succes"
    });
});

app.listen(PORT, () => {
    console.log(`Le serveur a démarrer sur : http://localhost:${PORT}`);
});