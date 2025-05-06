import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { useAuth } from '../../contexts/AuthContext';

const AddEntity = () => {
  const [entityType, setEntityType] = useState('user');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    location: '',
    description: '',
    role: 'user', // only for users
    owner_id: '' // for stores
  });
  const [storeOwners, setStoreOwners] = useState([]);
  const [message, setMessage] = useState('');
  const { user, getToken } = useAuth();

  useEffect(() => {
    const fetchStoreOwners = async () => {
      try {
        const token = getToken();
        if (!token) return;

        const response = await api.get('/admin/users', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        // Filter users with role 'store'
        const owners = response.data.filter(user => user.role === 'store');
        setStoreOwners(owners);
      } catch (error) {
        console.error('Error fetching store owners:', error);
        setMessage('Failed to fetch store owners');
      }
    };

    if (entityType === 'store') {
      fetchStoreOwners();
    }
  }, [entityType, getToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      if (entityType === 'user') {
        // Create user
        const response = await api.post('/auth/signup', {
          username: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
          address: formData.address,
        });
        setMessage('User created successfully');
      } else if (entityType === 'store') {
        // Create store
        const token = getToken();
        if (!token) {
          setMessage('You must be logged in to add a store');
          return;
        }

        if (!formData.owner_id) {
          setMessage('Please select a store owner');
          return;
        }

        const response = await api.post(
          '/stores',
          {
            name: formData.name,
            description: formData.description,
            location: formData.location,
            owner_id: formData.owner_id
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMessage('Store created successfully');
      }
      setFormData({ 
        name: '', 
        email: '', 
        password: '', 
        address: '', 
        location: '',
        description: '',
        role: 'user',
        owner_id: ''
      });
    } catch (error) {
      console.error('Error creating entity:', error);
      setMessage(error.response?.data?.message || 'Error creating entity');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Add New {entityType === 'user' ? 'User' : 'Store'}</h2>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Entity Type</label>
        <select
          value={entityType}
          onChange={(e) => setEntityType(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="user">User</option>
          <option value="store">Store</option>
        </select>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {entityType === 'user' ? (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="user">User</option>
                <option value="store">Store Owner</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </>
        ) : (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Store Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows="3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Store Owner</label>
              <select
                name="owner_id"
                value={formData.owner_id}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Select a store owner</option>
                {storeOwners.map(owner => (
                  <option key={owner.id} value={owner.id}>
                    {owner.name} ({owner.email})
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        {message && (
          <div className={`p-3 rounded-md ${message.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add {entityType === 'user' ? 'User' : 'Store'}
        </button>
      </form>
    </div>
  );
};

export default AddEntity;
