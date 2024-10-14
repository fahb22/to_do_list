const jwt = require('jsonwebtoken');
require('dotenv').config(); // Certifique-se de importar dotenv

// Função para gerar um token JWT
const generateToken = (user) => {
    return jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
        expiresIn: '1h', // O token expira em 1 hora
    });
};

// Função para verificar um token JWT
const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
    generateToken,
    verifyToken,
};
