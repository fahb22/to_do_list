const redis = require('redis');
require('dotenv').config(); // Certifique-se de importar dotenv

// Configuração do cliente Redis
const client = redis.createClient({
    socket: {
        host: process.env.REDIS_HOST,  // Endereço do servidor Redis, geralmente 'localhost'
        port: process.env.REDIS_PORT,   // Porta padrão do Redis
    }
});

// Gerenciar erros de conexão
client.on('error', (err) => {
    console.error('Error connecting to Redis:', err);
});

// Conectar ao Redis
client.connect().catch(console.error);

// Exporta o cliente para ser utilizado em outros arquivos
module.exports = client;
