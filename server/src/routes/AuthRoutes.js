const express = require('express');
const db = require('../models/index.js');
const UserRepository = require('../Repositories/UserRepository.js');
const AuthService = require('../services/AuthService.js');
const AuthController = require('../controllers/AuthContoller.js');

const router = express();
const userRepository = new UserRepository(db.User);
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

router.post("/register", (req, res)=>{
    authController.register(req, res);
});

module.exports = router;