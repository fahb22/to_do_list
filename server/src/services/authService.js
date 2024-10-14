// authService.js
const User = require('../models/user'); // Importa o modelo de usuários
const bcrypt = require('bcrypt');       // Para hashing de senhas
const jwt = require('jsonwebtoken');    // Para gerar tokens JWT
const { JWT_SECRET } = process.env;     // Chave secreta do JWT

// Verifica se JWT_SECRET está sendo carregado corretamente
if (!JWT_SECRET) {
    console.error('Erro: JWT_SECRET não está definida. Verifique o arquivo .env.');
    process.exit(1); // Encerra a aplicação se a chave secreta não estiver definida
}

/**
 * Registra um novo usuário.
 * @param {string} username - O nome do usuário.
 * @param {string} password - A senha do usuário.
 * @returns {Promise<object>} O novo usuário criado.
 * @throws {Error} Se o usuário já existir.
 */
const registerUser = async (username, password) => {
    try {
        // Verifica se o usuário já existe
        const existingUser = await User.findByUsername(username); // Usa findByUsername
        if (existingUser) {
            throw new Error('Usuário já existe.');
        }

        // Hasheia a senha antes de salvar
        const hashedPassword = await bcrypt.hash(password, 10);

        // Cria o novo usuário no banco de dados
        const newUser = await User.create(username, hashedPassword); // Usa create
        return newUser;
    } catch (error) {
        console.error('Erro ao registrar usuário:', error.message);
        throw error; // Re-lança o erro para ser tratado em outro lugar
    }
};

/**
 * Faz login de um usuário.
 * @param {string} username - O nome do usuário.
 * @param {string} password - A senha do usuário.
 * @returns {Promise<object>} Um objeto contendo o token JWT.
 * @throws {Error} Se as credenciais forem inválidas.
 */
const loginUser = async (username, password) => {
    try {
        // Verifica se o usuário existe
        const user = await User.findByUsername(username); // Usa findByUsername
        if (!user) {
            console.error('Usuário não encontrado:', username); // Log de erro
            throw new Error('Credenciais inválidas.');
        }

        // Compara a senha informada com a senha hasheada no banco de dados
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        // Logs para depuração
        console.log('Senha informada:', password); // Log da senha informada
        console.log('Senha hasheada no banco de dados:', user.password); // Log da senha hasheada
        console.log('Senha válida:', isPasswordValid); // Log do resultado da comparação

        if (!isPasswordValid) {
            console.error('Senha inválida para o usuário:', username); // Log de erro
            throw new Error('Credenciais inválidas.');
        }

        // Gera um token JWT com o ID do usuário
        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });

        return { token };
    } catch (error) {
        console.error('Erro ao fazer login:', error.message);
        throw error; // Re-lança o erro para ser tratado em outro lugar
    }
};

module.exports = {
    registerUser,
    loginUser
};
