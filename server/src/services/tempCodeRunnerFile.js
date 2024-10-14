const Task = require('../models/task'); // Importa o modelo de tarefas
const redisClient = require('../config/redis'); // Importa o cliente Redis para cache

const getAllTasks = async (userId) => {
    try {
        // Tenta pegar as tarefas do cache Redis
        const cachedTasks = await redisClient.get(`tasks:${userId}`);
        if (cachedTasks) {
            return JSON.parse(cachedTasks);
        }

        // Se não encontrar no cache, busca no banco de dados
        const tasks = await Task.findAll({ where: { userId } });

        // Armazena o resultado no cache Redis
        await redisClient.set(`tasks:${userId}`, JSON.stringify(tasks));

        return tasks;
    } catch (error) {
        console.error('Erro ao obter tarefas:', error);
        throw new Error('Erro ao buscar tarefas.');
    }
};

const createTask = async (userId, taskData) => {
    if (!taskData.title) {
        throw new Error('O título da tarefa não pode estar vazio.');
    }

    try {
        // Cria a nova tarefa
        const newTask = await Task.create({ ...taskData, userId });

        // Invalida o cache para forçar atualização na próxima consulta
        await redisClient.del(`tasks:${userId}`);

        return newTask;
    } catch (error) {
        console.error('Erro ao criar tarefa:', error);
        throw new Error('Erro ao criar a tarefa.');
    }
};

const updateTaskStatus = async (taskId, userId, status) => {
    const task = await Task.findOne({ where: { id: taskId, userId } });

    if (!task) {
        throw new Error('Tarefa não encontrada.');
    }

    // Validação adicional para o status da tarefa, se necessário
    task.status = status; // Certifique-se de que 'status' é válido
    await task.save();

    // Invalida o cache
    await redisClient.del(`tasks:${userId}`);

    return task;
};

const deleteTask = async (taskId, userId) => {
    const task = await Task.findOne({ where: { id: taskId, userId } });

    if (!task) {
        throw new Error('Tarefa não encontrada.');
    }

    // Remove a tarefa
    await task.destroy();

    // Invalida o cache
    await redisClient.del(`tasks:${userId}`);

    return { message: 'Tarefa removida com sucesso.' };
};

module.exports = {
    getAllTasks,
    createTask,
    updateTaskStatus,
    deleteTask
};
