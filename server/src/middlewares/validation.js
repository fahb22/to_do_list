const { body, validationResult } = require('express-validator');

// Middleware para validar as informações do usuário (registro e login)
exports.validateUser = [
    body('username').notEmpty().withMessage('O nome de usuário é obrigatório'),
    body('password').notEmpty().withMessage('A senha é obrigatória'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

// Middleware para validar a tarefa
exports.validateTask = [
    body('title').notEmpty().withMessage('O título é obrigatório'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

