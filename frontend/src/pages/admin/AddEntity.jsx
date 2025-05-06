import React, { useState, useContext } from 'react';
import api from '../../api/api';
import { useAuth } from '../../contexts/AuthContext';

const AddEntity = () => {
  const [entityType, setEntityType] = useState('user');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    role: 'user', // only for users
  });
  const [message, setMessage] = useState('');
  const { user, token } = useAuth();

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
        if (!token) {
          setMessage('You must be logged in to add a store');
          return;
        }
        const response = await api.post(
          '/stores',
          {
            name: formData.name,
            description: formData.address,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMessage('Store created successfully');
      }
      setFormData({ name: '', email: '', password: '', address: '', role: 'user' });
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error submitting form');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add New {entityType === 'user' ? 'User' : 'Store'}</h2>

      <div className="mb-4">
        <label className="mr-4">
          <input
            type="radio"
            name="entityType"
            value="user"
            checked={entityType === 'user'}
            onChange={() => setEntityType('user')}
          />
          <span className="ml-1">User</span>
        </label>
        <label className="ml-4">
          <input
            type="radio"
            name="entityType"
            value="store"
            checked={entityType === 'store'}
            onChange={() => setEntityType('store')}
          />
          <span className="ml-1">Store</span>
        </label>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
         
          maxLength={60}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />

      

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          maxLength={400}
          onChange={handleChange}
          required={entityType === 'store'}
         
          className="w-full px-3 py-2 border rounded"
        />

        {entityType === 'user' && (
          <>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              minLength={3}
              maxLength={16}
              required
              className="w-full px-3 py-2 border rounded"
            />

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="user">Normal User</option>
              <option value="admin">Admin</option>
              <option value="store">Store Owner</option>
            </select>
          </>
        )}

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Submit
        </button>
      </form>
      {message && <p className="mt-4 text-center text-red-600">{message}</p>}
    </div>
  );
};

export default AddEntity;
