const pool = require('../config/db');
const bcrypt = require('bcrypt');

class User {
    static async create(username, password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const res = await pool.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [username, hashedPassword]);
        return res.rows[0];
    }

    static async findByUsername(username) {
        const res = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        return res.rows[0];
    }
}

module.exports = User;
