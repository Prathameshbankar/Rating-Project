const Store = require('../models/Store');

const getStores = async (req, res) => {
  try {
    const stores = await Store.getAllStores();
    res.json(stores);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stores' });
  }
};

const addStore = async (req, res) => {
  const { name, description } = req.body;
  const owner_id = req.user.id;
  try {
    const newStore = await Store.createStore(name, description, owner_id);
    res.status(201).json(newStore);
  } catch (error) {
    res.status(500).json({ message: 'Error creating store' });
  }
};

module.exports = {
  getStores,
  addStore,
};
