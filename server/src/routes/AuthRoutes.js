const express = require('express');
const db = require('../models/index.js');
const UserRepository = require('../Repositories/UserRepository.js');
const AuthService = require('../services/AuthService.js');
const AuthController = require('../controllers/AuthController.js');

const router = express.Router();
const userRepository = new UserRepository(db.User);
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

module.exports = router;