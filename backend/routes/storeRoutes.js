const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');
const authenticateToken = require('../middleware/authMiddleware');

router.get('/', storeController.getStores);
router.post('/', authenticateToken, storeController.addStore);

module.exports = router;
