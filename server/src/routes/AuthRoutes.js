const express = require('express');
const db = require('../models/index.js');
const UserRepository = require('../Repositories/UserRepository.js');
const AuthService = require('../services/AuthService.js');
const AuthController = require('../controllers/AuthController.js');

const router = express.Router();
const userRepository = new UserRepository(db.User);
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

router.post("/register", (req, res)=>{
    authController.register(req, res);
});

router.post("/login", (req, res) => {
    authController.login(req, res);
});

router.post("/logout", (req, res)=>{
    authController.logout(req, res);
});
module.exports = router;