const taskService = require('../services/taskService');

exports.createTask = async (req, res) => {
    const { title } = req.body;
    const userId = req.user.id; // ID do usuário autenticado

    if (!title) {
        return res.status(400).json({ message: 'Título é obrigatório' });
    }

    try {
        const task = await taskService.createTask(userId, { title }); // Passa ID do usuário e um objeto
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar a tarefa' });
    }
};

exports.getAllTasks = async (req, res) => {
    const userId = req.user.id;

    try {
        const tasks = await taskService.getAllTasks(userId);
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar tarefas' });
    }
};

exports.updateTaskStatus = async (req, res) => {
    const { id } = req.params; // Pega o ID da tarefa da URL
    const { completed } = req.body; // Supondo que você está atualizando o status da tarefa

    try {
        const updatedTask = await taskService.updateTaskStatus(id, req.user.id, completed);
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar a tarefa' });
    }
};

exports.deleteTask = async (req, res) => {
    const { id } = req.params;

    try {
        await taskService.deleteTask(id, req.user.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar a tarefa' });
    }
};

