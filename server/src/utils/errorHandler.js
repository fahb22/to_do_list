// Middleware de tratamento de erros
module.exports = (err, req, res, next) => {
    console.error(err.stack);  // Exibe a pilha do erro no console para debug

    // Verifica se o erro já tem um status definido, caso contrário, define como 500 (Erro interno)
    const statusCode = err.statusCode || 500;

    // Envia a resposta com o código de erro e a mensagem
    res.status(statusCode).json({
        message: err.message || 'Ocorreu um erro interno no servidor',
        // Opcional: Enviar o stack trace em ambiente de desenvolvimento para ajudar na depuração
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};
