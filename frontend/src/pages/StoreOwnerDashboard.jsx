import React, { useState, useEffect } from 'react';
import api from '../api/api';
import { useAuth } from '../contexts/AuthContext';

const StoreOwnerDashboard = () => {
  const [stores, setStores] = useState([]);
  const [ratings, setRatings] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getToken();
        if (!token) {
          setError('Please log in to view your dashboard');
          setLoading(false);
          return;
        }

        // Fetch owner's stores
        const storesResponse = await api.get('/stores/my-stores', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (storesResponse.data.success) {
          setStores(storesResponse.data.stores);
          
          // Fetch ratings for each store
          const ratingsPromises = storesResponse.data.stores.map(store =>
            api.get(`/ratings/store/${store.id}`, {
              headers: { Authorization: `Bearer ${token}` }
            })
          );

          const ratingsResponses = await Promise.all(ratingsPromises);
          const ratingsMap = {};
          
          ratingsResponses.forEach((response, index) => {
            if (response.data.success) {
              const storeId = storesResponse.data.stores[index].id;
              ratingsMap[storeId] = response.data.ratings;
            }
          });

          setRatings(ratingsMap);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError(error.response?.data?.message || 'Failed to fetch dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [getToken]);

  const calculateAverageRating = (storeRatings) => {
    if (!storeRatings || storeRatings.length === 0) return 0;
    const sum = storeRatings.reduce((acc, curr) => acc + curr.rating, 0);
    return (sum / storeRatings.length).toFixed(1);
  };

  if (loading) {
    return <div className="p-6 text-center">Loading your dashboard...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Store Owner Dashboard</h1>
      
      {stores.length === 0 ? (
        <div className="text-center text-gray-600">
          <p>You haven't created any stores yet.</p>
          <p className="mt-2">Create a store to start receiving ratings!</p>
        </div>
      ) : (
        <div className="space-y-8">
          {stores.map(store => (
            <div key={store.id} className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">{store.name}</h2>
              <p className="text-gray-600 mb-2">{store.description}</p>
              <p className="text-gray-600 mb-4">Location: {store.location}</p>
              
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Store Ratings</h3>
                <p className="text-2xl font-bold text-blue-600">
                  {calculateAverageRating(ratings[store.id])} / 5
                </p>
              </div>

              {ratings[store.id] && ratings[store.id].length > 0 ? (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Recent Ratings</h3>
                  <div className="space-y-4">
                    {ratings[store.id].map(rating => (
                      <div key={rating.id} className="border-b pb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">Rating: {rating.rating}/5</span>
                          <span className="text-sm text-gray-500">
                            {new Date(rating.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        {rating.comment && (
                          <p className="text-gray-600">{rating.comment}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">No ratings yet for this store.</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StoreOwnerDashboard;
