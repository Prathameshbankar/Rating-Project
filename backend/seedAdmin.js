require('dotenv').config();
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const createAdminUser = async () => {
  try {
    const email = 'admin@example.com';
    const existingAdmin = await User.findUserByEmail(email);
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }
    const hashedPassword = await bcrypt.hash('adminpassword', 10);
    const adminUser = await User.createUser('admin', email, hashedPassword, 'admin');
    console.log('Admin user created successfully:', adminUser);
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
};

createAdminUser();
