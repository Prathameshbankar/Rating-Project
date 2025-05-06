const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');
const authenticateToken = require('../middleware/authMiddleware');

router.post('/', authenticateToken, ratingController.addRating);
router.get('/:storeId', ratingController.getRatingsForStore);

module.exports = router;
