const db = require('../config/db');

const createStoreTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS stores (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      description TEXT,
      owner_id INTEGER REFERENCES users(id),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  await db.query(queryText);
};

const createStore = async (name, description, owner_id) => {
  const result = await db.query(
    'INSERT INTO stores (name, description, owner_id) VALUES ($1, $2, $3) RETURNING *',
    [name, description, owner_id]
  );
  return result.rows[0];
};

const getAllStores = async () => {
  const result = await db.query('SELECT * FROM stores ORDER BY created_at DESC');
  return result.rows;
};

const getStoreById = async (id) => {
  const result = await db.query('SELECT * FROM stores WHERE id = $1', [id]);
  return result.rows[0];
};

module.exports = {
  createStoreTable,
  createStore,
  getAllStores,
  getStoreById,
};
