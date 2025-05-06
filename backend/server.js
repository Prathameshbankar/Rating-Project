require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

const authRoutes = require('./routes/authRoutes');
const storeRoutes = require('./routes/storeRoutes');
const ratingRoutes = require('./routes/ratingRoutes');

const { createUserTable } = require('./models/User');
const { createStoreTable } = require('./models/Store');
const { createRatingTable } = require('./models/Rating');

const userRoutes = require('./routes/userRoutes');

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Rating System Backend is running');
});

const createTables = async () => {
  try {
    await createUserTable();
    await createStoreTable();
    await createRatingTable();
    console.log('Database tables created or already exist');
  } catch (error) {
    console.error('Error creating tables:', error);
  }
};

app.listen(port, async () => {
  await createTables();
  console.log(`Server running on port ${port}`);
});
