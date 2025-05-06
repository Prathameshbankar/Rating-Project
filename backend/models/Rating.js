const db = require('../config/db');

const createRatingTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS ratings (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id),
      store_id INTEGER REFERENCES stores(id),
      rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
      comment TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  await db.query(queryText);
};

const createRating = async (user_id, store_id, rating, comment) => {
  const result = await db.query(
    'INSERT INTO ratings (user_id, store_id, rating, comment) VALUES ($1, $2, $3, $4) RETURNING *',
    [user_id, store_id, rating, comment]
  );
  return result.rows[0];
};

const getRatingsByStoreId = async (store_id) => {
  const result = await db.query('SELECT * FROM ratings WHERE store_id = $1 ORDER BY created_at DESC', [store_id]);
  return result.rows;
};

const getAllRatings = async () => {
  const result = await db.query('SELECT * FROM ratings ORDER BY created_at DESC');
  return result.rows;
};

module.exports = {
  createRatingTable,
  createRating,
  getRatingsByStoreId,
  getAllRatings
};
