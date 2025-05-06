const bcrypt = require('bcryptjs');
const db = require('../config/db');
const User = require('../models/User');

const createAdminUser = async () => {
  try {
    await User.createUserTable();

    const existingAdmin = await User.findUserByEmail('admin@gmail.com');
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash('123456', 10);
    const adminUser = await User.createUser('admin', 'admin@gmail.com', hashedPassword, 'admin', 'Admin Address');
    console.log('Admin user created successfully:', adminUser);
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
};

createAdminUser();
