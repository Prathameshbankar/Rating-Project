import React, { useState, useEffect } from 'react';
import api from '../api/api';
import { useAuth } from '../contexts/AuthContext';

const StoreListings = ({ searchTerm, userRatings, setUserRatings }) => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchStores = async () => {
      try {
        setLoading(true);
        const response = await api.get('/stores');
        if (response.data.success) {
          setStores(response.data.stores);
        } else {
          throw new Error(response.data.message || 'Failed to fetch stores');
        }
      } catch (error) {
        console.error('Error fetching stores:', error);
        setError(error.response?.data?.message || 'Failed to fetch stores');
      } finally {
        setLoading(false);
      }
    };
    
    fetchStores();
  }, []);

  const handleRatingChange = async (storeId, rating) => {
    try {
      const token = getToken();
      if (!token) {
        setError('Please log in to rate stores');
        return;
      }

      const response = await api.post(
        `/ratings/${storeId}`,
        { rating },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        setUserRatings(prevRatings => ({
          ...prevRatings,
          [storeId]: rating
        }));
      } else {
        throw new Error(response.data.message || 'Failed to submit rating');
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
      setError(error.response?.data?.message || 'Failed to submit rating');
    }
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;

    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            className={`text-xl ${
              index < fullStars
                ? 'text-yellow-400'
                : index === fullStars && halfStar
                ? 'text-yellow-400 opacity-50'
                : 'text-gray-300'
            }`}
          >
            ★
          </span>
        ))}
        <span className="ml-2 text-sm text-gray-600">({rating.toFixed(1)})</span>
      </div>
    );
  };

  const filteredStores = stores.filter(store =>
    store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="text-center py-4">Loading stores...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-4">{error}</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Store Listings</h2>
      {filteredStores.length > 0 ? (
        <div className="space-y-4">
          {filteredStores.map((store) => (
            <div key={store.id} className="bg-white shadow-md p-6 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{store.name}</h3>
                  <p className="text-gray-600 mt-1">{store.location}</p>
                  {store.description && (
                    <p className="text-gray-500 mt-2">{store.description}</p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Owner: {store.owner}</p>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm font-medium mb-2">Your Rating:</p>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => handleRatingChange(store.id, rating)}
                      className={`p-2 rounded-lg transition-colors ${
                        userRatings[store.id] === rating
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 hover:bg-gray-300'
                      }`}
                    >
                      {rating} ★
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No stores found matching your search criteria.</p>
      )}
    </div>
  );
};

export default StoreListings;
