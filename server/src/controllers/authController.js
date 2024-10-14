// authController.js
const authService = require('../services/authService'); // Importa o serviço de autenticação

// Método para registrar um novo usuário
exports.register = async (req, res) => {
    // Extrai username e password do corpo da requisição
    const { username, password } = req.body;

    try {
        // Chama o serviço para registrar o usuário com as credenciais fornecidas
        const newUser = await authService.registerUser(username, password);
        
        // Se o registro for bem-sucedido, retorna uma resposta com status 201 (Criado)
        res.status(201).json({
            message: 'Usuário registrado com sucesso!', // Mensagem de sucesso
            user: { id: newUser.id, username: newUser.username } // Retorna informações básicas do novo usuário
        });
    } catch (error) {
        // Em caso de erro (como usuário já existente), trata o erro e retorna uma resposta
        res.status(400).json({ message: error.message }); // Responde com status 400 e a mensagem do erro
    }
};

// Método para realizar login de um usuário
exports.login = async (req, res) => {
    // Extrai username e password do corpo da requisição
    const { username, password } = req.body;

    try {
        // Chama o serviço para autenticar o usuário com as credenciais fornecidas
        const result = await authService.loginUser(username, password);
        
        // Se a autenticação for bem-sucedida, retorna o resultado (token JWT, por exemplo)
        res.json(result);
    } catch (error) {
        // Em caso de erro (como credenciais inválidas), trata o erro e retorna uma resposta
        res.status(401).json({ message: error.message }); // Responde com status 401 (Não Autorizado) e a mensagem do erro
    }
};
