const db = require('../config/db');

const addLocationToStores = async () => {
  try {
    // Add location column if it doesn't exist
    await db.query(`
      DO $$ 
      BEGIN 
        IF NOT EXISTS (
          SELECT 1 
          FROM information_schema.columns 
          WHERE table_name = 'stores' 
          AND column_name = 'location'
        ) THEN
          ALTER TABLE stores ADD COLUMN location VARCHAR(255);
        END IF;
      END $$;
    `);
    
    console.log('Successfully added location column to stores table');
  } catch (error) {
    console.error('Error adding location column:', error);
    throw error;
  }
};

// Run the migration
addLocationToStores()
  .then(() => {
    console.log('Migration completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Migration failed:', error);
    process.exit(1);
  }); 