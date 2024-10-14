const jwt = require('jsonwebtoken');

// Carregue a chave secreta do ambiente
const JWT_SECRET = process.env.JWT_SECRET; // Certifique-se de definir essa variável em seu .env

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET não está definida. Verifique o arquivo .env.'); // Adiciona erro caso a chave não esteja definida
}

exports.authenticate = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: 'Acesso Negado. Token não fornecido.' }); // Mensagem de erro mais informativa
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido. Acesso negado.' }); // Mensagem de erro mais informativa
        }
        req.user = user; // Adiciona os dados do usuário à requisição
        next(); // Passa o controle para o próximo middleware ou rota
    });
};
