const { Pool } = require('pg');
require('dotenv').config(); // Certifique-se de importar dotenv

// Configuração do banco de dados
const pool = new Pool({
    user: process.env.DB_USER,           // Usuário do PostgreSQL
    host: process.env.DB_HOST,           // Host do banco de dados
    database: process.env.DB_NAME,       // Nome do banco de dados
    password: process.env.DB_PASSWORD,    // Senha do PostgreSQL
    port: process.env.DB_PORT,           // Porta padrão do PostgreSQL
});

// Exporta o pool para ser utilizado em outros arquivos
module.exports = pool;
