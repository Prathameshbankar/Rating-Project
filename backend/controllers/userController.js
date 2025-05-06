const User = require('../models/User');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers();
    res.json({ success: true, users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error fetching users' });
  }
};

module.exports = {
  getAllUsers,
};
