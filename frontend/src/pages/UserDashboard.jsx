// UserDashboard.js
import React, { useState, useEffect } from 'react';
import StoreListings from './StoreListings';
import { useAuth } from '../contexts/AuthContext';
import api from '../api/api';

const UserDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [userRatings, setUserRatings] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchUserRatings = async () => {
      try {
        const token = getToken();
        if (!token) {
          setLoading(false);
          return;
        }

        const response = await api.get('/ratings/user', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data.success) {
          const ratingsMap = {};
          response.data.ratings.forEach(rating => {
            ratingsMap[rating.storeId] = rating.rating;
          });
          setUserRatings(ratingsMap);
        }
      } catch (error) {
        console.error('Error fetching user ratings:', error);
        setError(error.response?.data?.message || 'Failed to fetch your ratings');
      } finally {
        setLoading(false);
      }
    };

    fetchUserRatings();
  }, [getToken]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  if (loading) {
    return <div className="text-center py-4">Loading your dashboard...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-4">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Store Ratings</h1>
        
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search stores by name or location..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <StoreListings
          searchTerm={searchTerm}
          userRatings={userRatings}
          setUserRatings={setUserRatings}
        />
      </div>
    </div>
  );
};

export default UserDashboard;
