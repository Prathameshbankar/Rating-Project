const db = require('../config/db');

const createUserTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(50) UNIQUE NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(20) DEFAULT 'user',
      address VARCHAR(400),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  await db.query(queryText);
};

const createUser = async (username, email, password, role = 'user', address = null) => {
  const result = await db.query(
    'INSERT INTO users (username, email, password, role, address) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [username, email, password, role, address]
  );
  return result.rows[0];
};

const findUserByEmail = async (email) => {
  const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};

const findUserById = async (id) => {
  const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
  return result.rows[0];
};

const getAllUsers = async () => {
  const result = await db.query('SELECT * FROM users ORDER BY id');
  return result.rows;
};

module.exports = {
  createUserTable,
  createUser,
  findUserByEmail,
  findUserById,
  getAllUsers, // ✅ Export the new method
};
