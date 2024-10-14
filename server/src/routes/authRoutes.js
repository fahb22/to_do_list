const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Rota para registro de novos usuários
router.post('/register', authController.register);

// Rota para login de usuários
router.post('/login', authController.login);

module.exports = router;
