const express = require('express');
const env = require('dotenv');
const authRoutes = require('./src/routes/AuthRoutes.js');
const db = require('./src/models');
const bcrypt = require('bcrypt');
const UserRepository = require('./src/Repositories/UserRepository.js');
const AuthService = require('./src/services/AuthService.js');
const AuthController = require('./src/controllers/AuthContoller.js');




env.config();
const app = express();
app.use(express.json());//pour lire le requ.body en JSON
const PORT = process.env.PORT;
const saltRound = 10;
const userRepository = new UserRepository(db.User);
const authService = new AuthService(userRepository);
const authContoller = new AuthController(authService);

//Routes
app.use("/api/v1/auth", authRoutes);
app.post("/api/v1/auth/login", async (req, res) => {
    authContoller.login(req, res);
});

app.listen(PORT, () => {
    console.log(`Le serveur a démarrer sur : http://localhost:${PORT}`);
});