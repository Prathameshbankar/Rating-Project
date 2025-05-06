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

const getUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers();
    const formattedUsers = users.map(user => ({
      id: user.id,
      name: user.username,
      email: user.email,
      role: user.role
    }));
    res.json(formattedUsers);
  } catch (error) {
    console.error('Error in getUsers:', error);
    res.status(500).json({ 
      message: 'Error fetching users',
      error: error.message 
    });
  }
};

const getAdmins = async (req, res) => {
  try {
    const users = await User.getAllUsers();
    const admins = users.filter(user => user.role === 'admin').map(admin => ({
      id: admin.id,
      name: admin.username,
      email: admin.email,
      role: admin.role
    }));
    res.json(admins);
  } catch (error) {
    console.error('Error in getAdmins:', error);
    res.status(500).json({ 
      message: 'Error fetching admins',
      error: error.message 
    });
  }
};

const getStores = async (req, res) => {
  try {
    const stores = await Store.getAllStores();
    const formattedStores = stores.map(store => ({
      id: store.id,
      name: store.name,
      owner: store.owner_name,
      location: store.location
    }));
    res.json(formattedStores);
  } catch (error) {
    console.error('Error in getStores:', error);
    res.status(500).json({ 
      message: 'Error fetching stores',
      error: error.message 
    });
  }
};

module.exports = {
  getDashboardStats,
  getUsers,
  getAdmins,
  getStores
}; 