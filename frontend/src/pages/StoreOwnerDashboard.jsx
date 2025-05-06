import React, { useState, useEffect } from 'react';
import api from '../api';
import { useAuth } from '../contexts/AuthContext';

const StoreOwnerDashboard = () => {
  const [stores, setStores] = useState([]);
  const [ratings, setRatings] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch owner's stores
        const storesResponse = await api.get('/api/stores/my-stores');
        setStores(storesResponse.data);
        
        // Fetch ratings for each store
        const ratingsPromises = storesResponse.data.map(store =>
          api.get(`/api/ratings/store/${store.id}`)
        );

        const ratingsResponses = await Promise.all(ratingsPromises);
        const ratingsMap = {};
        
        ratingsResponses.forEach((response, index) => {
          const storeId = storesResponse.data[index].id;
          ratingsMap[storeId] = response.data;
        });

        setRatings(ratingsMap);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError(error.response?.data?.message || 'Failed to fetch dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const calculateAverageRating = (storeRatings) => {
    if (!storeRatings || storeRatings.length === 0) return 0;
    const sum = storeRatings.reduce((acc, curr) => acc + curr.rating, 0);
    return (sum / storeRatings.length).toFixed(1);
  };

  if (loading) {
    return (
      <div className="p-6 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading your stores...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Store Owner Dashboard</h1>
        <button
          onClick={() => window.location.href = '/stores/new'}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add New Store
        </button>
      </div>
      
      {stores.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">No Stores Yet</h2>
          <p className="text-gray-600 mb-6">You haven't created any stores yet.</p>
          <button
            onClick={() => window.location.href = '/stores/new'}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create Your First Store
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stores.map(store => (
            <div key={store.id} className="bg-white shadow-lg rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{store.name}</h2>
                  <p className="text-gray-600 mt-1">{store.location}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">
                    {calculateAverageRating(ratings[store.id])} / 5
                  </div>
                  <div className="text-sm text-gray-500">
                    {ratings[store.id]?.length || 0} ratings
                  </div>
                </div>
              </div>

              <p className="text-gray-600 mb-4 line-clamp-2">{store.description}</p>
              
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-3">Recent Ratings</h3>
                {ratings[store.id] && ratings[store.id].length > 0 ? (
                  <div className="space-y-3">
                    {ratings[store.id].slice(0, 3).map(rating => (
                      <div key={rating.id} className="border-b pb-3 last:border-0">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium text-gray-800">Rating: {rating.rating}/5</span>
                          <span className="text-sm text-gray-500">
                            {new Date(rating.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        {rating.comment && (
                          <p className="text-gray-600 text-sm">{rating.comment}</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">No ratings yet for this store.</p>
                )}
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => window.location.href = `/stores/${store.id}/edit`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Edit Store
                </button>
                <button
                  onClick={() => window.location.href = `/stores/${store.id}`}
                  className="text-green-600 hover:text-green-800"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StoreOwnerDashboard;
