const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authenticateToken = require('../middleware/authMiddleware');

// Get dashboard statistics
router.get('/stats', authenticateToken, adminController.getDashboardStats);

// Get all users
router.get('/users', authenticateToken, adminController.getUsers);

// Get all admins
router.get('/admins', authenticateToken, adminController.getAdmins);

// Get all stores
router.get('/stores', authenticateToken, adminController.getStores);

module.exports = router; 