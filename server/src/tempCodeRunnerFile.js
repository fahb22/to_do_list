// Importações necessárias
const express = require("express");
const app = express(); // Cria uma instância do aplicativo Express
const taskRoutes = require('./routes/taskRoutes'); // Importa as rotas de tarefas
const authRoutes = require('./routes/authRoutes'); // Importa as rotas de autenticação
const errorHandler = require('./utils/errorHandler'); // Importa o middleware de tratamento de erros

const port = process.env.PORT || 3000; // Define a porta que o servidor irá escutar

// Middleware para analisar JSON
app.use(express.json()); // Usando express.json() em vez de body-parser

// Rota principal para teste
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Definição das rotas
app.use('/api/tasks', taskRoutes); // Rotas para tarefas
app.use('/api/auth', authRoutes); // Rotas para autenticação

// Middleware para tratamento de erros
app.use(errorHandler);

// Inicializa o servidor
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
