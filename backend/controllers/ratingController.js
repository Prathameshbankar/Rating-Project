const Rating = require('../models/Rating');

const addRating = async (req, res) => {
  const { store_id, rating, comment } = req.body;
  const user_id = req.user.id;
  try {
    const newRating = await Rating.createRating(user_id, store_id, rating, comment);
    res.status(201).json({
      success: true,
      rating: newRating
    });
  } catch (error) {
    console.error('Error adding rating:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error adding rating' 
    });
  }
};

const getRatingsForStore = async (req, res) => {
  const store_id = req.params.storeId;
  try {
    const ratings = await Rating.getRatingsByStoreId(store_id);
    res.json({
      success: true,
      ratings
    });
  } catch (error) {
    console.error('Error fetching store ratings:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error fetching ratings' 
    });
  }
};

const getUserRatings = async (req, res) => {
  const user_id = req.user.id;
  try {
    const ratings = await Rating.getRatingsByUserId(user_id);
    res.json({
      success: true,
      ratings
    });
  } catch (error) {
    console.error('Error fetching user ratings:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error fetching your ratings' 
    });
  }
};

module.exports = {
  addRating,
  getRatingsForStore,
  getUserRatings
};
