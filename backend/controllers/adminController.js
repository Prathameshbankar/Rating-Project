const User = require('../models/User');
const Store = require('../models/Store');
const Rating = require('../models/Rating');

const getDashboardStats = async (req, res) => {
  try {
    console.log('Fetching dashboard stats...');
    
    // Get total users count
    const usersResult = await User.getAllUsers();
    console.log('Users fetched:', usersResult.length);
    const totalUsers = usersResult.length;

    // Get total stores count
    const storesResult = await Store.getAllStores();
    console.log('Stores fetched:', storesResult.length);
    const totalStores = storesResult.length;

    // Get total ratings count
    const ratingsResult = await Rating.getAllRatings();
    console.log('Ratings fetched:', ratingsResult.length);
    const totalRatings = ratingsResult.length;

    const stats = {
      totalUsers,
      totalStores,
      totalRatings
    };
    console.log('Sending stats:', stats);
    res.json(stats);
  } catch (error) {
    console.error('Detailed error in getDashboardStats:', error);
    res.status(500).json({ 
      message: 'Error fetching dashboard statistics',
      error: error.message 
    });
  }
};

module.exports = {
  getDashboardStats
}; 