const db = require('../config/db');

const createStoreTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS stores (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      description TEXT,
      location VARCHAR(255),
      owner_id INTEGER REFERENCES users(id),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  await db.query(queryText);
};

const createStore = async (name, description, location, owner_id) => {
  const result = await db.query(
    'INSERT INTO stores (name, description, location, owner_id) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, description, location, owner_id]
  );
  return result.rows[0];
};

const getAllStores = async () => {
  const result = await db.query(`
    SELECT s.*, u.username as owner_name 
    FROM stores s 
    LEFT JOIN users u ON s.owner_id = u.id 
    ORDER BY s.created_at DESC
  `);
  return result.rows;
};

const getStoreById = async (id) => {
  const result = await db.query(`
    SELECT s.*, u.username as owner_name 
    FROM stores s 
    LEFT JOIN users u ON s.owner_id = u.id 
    WHERE s.id = $1
  `, [id]);
  return result.rows[0];
};

module.exports = {
  createStoreTable,
  createStore,
  getAllStores,
  getStoreById,
};
