const { pool } = require('../config/db');

exports.getUsers = async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM users');
  res.json(rows);
};

exports.createUser = async (req, res) => {
  const { name } = req.body;
  const result = await pool.query('INSERT INTO users (name) VALUES ($1) RETURNING *', [name]);
  res.status(201).json(result.rows[0]);
};
