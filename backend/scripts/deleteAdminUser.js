const db = require('../config/db');

const deleteAdminUser = async () => {
  try {
    const res = await db.query('DELETE FROM users WHERE email = $1', ['admin@gmail.com']);
    console.log('Deleted admin user if existed:', res.rowCount);
    process.exit(0);
  } catch (error) {
    console.error('Error deleting admin user:', error);
    process.exit(1);
  }
};

deleteAdminUser();
