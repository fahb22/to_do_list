const express = require('express');
const authRoutes = require('./authRoutes'); // Importa as rotas de autenticação
const taskRoutes = require('./taskRoutes'); // Importa as rotas de tarefas

const router = express.Router();

// Integrando as rotas de autenticação
router.use('/auth', authRoutes); // Todas as rotas de auth terão o prefixo '/auth'

// Integrando as rotas de tarefas
router.use('/tasks', taskRoutes); // Todas as rotas de tasks terão o prefixo '/tasks'

module.exports = router;
