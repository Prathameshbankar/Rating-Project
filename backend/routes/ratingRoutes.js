const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');
const authenticateToken = require('../middleware/authMiddleware');

// Get user's ratings (requires authentication)
router.get('/user', authenticateToken, ratingController.getUserRatings);

// Get ratings for a specific store
router.get('/:storeId', ratingController.getRatingsForStore);

// Add a new rating (requires authentication)
router.post('/', authenticateToken, ratingController.addRating);

module.exports = router;
