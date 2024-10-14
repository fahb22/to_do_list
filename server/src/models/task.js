const pool = require('../config/db');

/*Os placeholders, como $1, $2 ou ?, são usados em consultas parametrizadas para separar a lógica da consulta SQL dos dados fornecidos 
pelo usuário. Isso garante que os dados inseridos (como nome de usuário e senha) sejam tratados como valores literais pelo banco de dados 
e não como parte da consulta SQL, evitando SQL Injection.*/

class Task {
    static async create(title, userId) {
        const res = await pool.query('INSERT INTO tasks (title, user_id) VALUES ($1, $2) RETURNING *', [title, userId]);
        return res.rows[0];
    }

    static async findAll(userId) {
        const res = await pool.query('SELECT * FROM tasks WHERE user_id = $1', [userId]);
        return res.rows;
    }

    static async update(id, completed) {
        const res = await pool.query('UPDATE tasks SET completed = $1 WHERE id = $2 RETURNING *', [completed, id]);
        return res.rows[0];
    }

    static async delete(id) {
        await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
    }
}

module.exports = Task;
