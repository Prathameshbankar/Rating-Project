const Rating = require('../models/Rating');

const addRating = async (req, res) => {
  const { store_id, rating, comment } = req.body;
  const user_id = req.user.id;
  try {
    const newRating = await Rating.createRating(user_id, store_id, rating, comment);
    res.status(201).json(newRating);
  } catch (error) {
    res.status(500).json({ message: 'Error adding rating' });
  }
};

const getRatingsForStore = async (req, res) => {
  const store_id = req.params.storeId;
  try {
    const ratings = await Rating.getRatingsByStoreId(store_id);
    res.json(ratings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching ratings' });
  }
};

module.exports = {
  addRating,
  getRatingsForStore,
};
