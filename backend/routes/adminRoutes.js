const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authenticateToken = require('../middleware/authMiddleware');

// Get dashboard statistics
router.get('/stats', authenticateToken, adminController.getDashboardStats);

module.exports = router; 