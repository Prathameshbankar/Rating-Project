const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Public route - no authentication needed
router.get('/', userController.getAllUsers);

module.exports = router;