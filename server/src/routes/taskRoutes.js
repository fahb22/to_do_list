const express = require('express');
const taskController = require('../controllers/taskController');
const { authenticate } = require('../middlewares/authMiddleware'); // Middleware para verificar autenticação

const router = express.Router();

// Rota para listar todas as tarefas (somente para usuários autenticados)
router.get('/', authenticate, taskController.getAllTasks);

// Rota para criar uma nova tarefa (somente para usuários autenticados)
router.post('/', authenticate, taskController.createTask);

// Rota para atualizar o status de uma tarefa (somente para usuários autenticados)
router.put('/:id', authenticate, taskController.updateTaskStatus);

// Rota para remover uma tarefa (somente para usuários autenticados)
router.delete('/:id', authenticate, taskController.deleteTask);

module.exports = router;
