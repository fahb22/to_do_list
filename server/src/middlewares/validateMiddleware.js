const { body, validationResult } = require('express-validator');

// Validação para Tarefas
exports.validateTask = [
    body('title')
        .notEmpty().withMessage('O título é obrigatório') // Verifica se 'title' não está vazio
        .isLength({ min: 3 }).withMessage('O título deve ter pelo menos 3 caracteres'), // Verifica se 'title' tem pelo menos 3 caracteres
    (req, res, next) => {
        const errors = validationResult(req); // Verifica se existem erros de validação
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() }); // Retorna os erros se existirem
        }
        next(); // Prossegue para o próximo middleware ou rota
    },
];

// Validação para Usuários
exports.validateUser = [
    body('username')
        .notEmpty().withMessage('O nome de usuário é obrigatório') // Verifica se 'username' não está vazio
        .isEmail().withMessage('O nome de usuário deve ser um email válido'), // Verifica se 'username' é um email válido
    body('password')
        .notEmpty().withMessage('A senha é obrigatória') // Verifica se 'password' não está vazio
        .isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres') // Verifica se 'password' tem pelo menos 6 caracteres
        .matches(/\d/).withMessage('A senha deve conter pelo menos um número'), // Verifica se 'password' contém pelo menos um número
    (req, res, next) => {
        const errors = validationResult(req); // Verifica se existem erros de validação
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() }); // Retorna os erros se existirem
        }
        next(); // Prossegue para o próximo middleware ou rota
    },
];
