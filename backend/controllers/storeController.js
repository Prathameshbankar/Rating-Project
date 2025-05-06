const Store = require('../models/Store');

const getStores = async (req, res) => {
  try {
    const stores = await Store.getAllStores();
    const formattedStores = stores.map(store => ({
      id: store.id,
      name: store.name,
      description: store.description,
      location: store.location,
      owner: store.owner_name,
      created_at: store.created_at
    }));
    res.json({
      success: true,
      stores: formattedStores
    });
  } catch (error) {
    console.error('Error in getStores:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error fetching stores',
      error: error.message 
    });
  }
};

const addStore = async (req, res) => {
  try {
    const { name, description, location } = req.body;
    const owner_id = req.user.id;

    // Input validation
    if (!name || !location) {
      return res.status(400).json({ 
        success: false,
        message: 'Store name and location are required' 
      });
    }

    if (name.length > 100) {
      return res.status(400).json({
        success: false,
        message: 'Store name must be less than 100 characters'
      });
    }

    if (location.length > 255) {
      return res.status(400).json({
        success: false,
        message: 'Location must be less than 255 characters'
      });
    }

    // Check if user has permission to create store
    if (req.user.role !== 'store' && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Only store owners and admins can create stores'
      });
    }

    const newStore = await Store.createStore(name, description, location, owner_id);
    
    // Format the response
    const formattedStore = {
      id: newStore.id,
      name: newStore.name,
      description: newStore.description,
      location: newStore.location,
      owner_id: newStore.owner_id,
      created_at: newStore.created_at
    };

    res.status(201).json({
      success: true,
      message: 'Store created successfully',
      store: formattedStore
    });
  } catch (error) {
    console.error('Error in addStore:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error creating store',
      error: error.message 
    });
  }
};

module.exports = {
  getStores,
  addStore,
};
