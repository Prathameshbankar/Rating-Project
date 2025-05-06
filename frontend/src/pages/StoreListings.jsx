import React, { useState, useEffect } from 'react';

const StoreListings = ({ searchTerm, userRatings, setUserRatings }) => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    // Fetch the store data from the backend or mock data
    const fetchStores = async () => {
      const fetchedStores = [
        { id: 1, name: 'Store A', address: '123 Main St', rating: 4.5 },
        { id: 2, name: 'Store B', address: '456 Oak Rd', rating: 3.8 },
        { id: 3, name: 'Store C', address: '789 Pine Ln', rating: 4.2 },
      ];
      setStores(fetchedStores);
    };
    
    fetchStores();
  }, []);

  const filteredStores = stores.filter(store =>
    store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRatingChange = (storeId, rating) => {
    setUserRatings(prevRatings => ({
      ...prevRatings,
      [storeId]: rating, // Update or add the rating for the given store
    }));
  };

  // Function to render stars for rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating); // Number of full stars
    const halfStar = rating % 1 >= 0.5; // Check for half-star

    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push('★'); // Full star
      } else if (i === fullStars && halfStar) {
        stars.push('☆'); // Half star
      } else {
        stars.push('☆'); // Empty star
      }
    }
    return stars.join(''); // Join array into a string of stars
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Store Listings</h2>
      {filteredStores.length > 0 ? (
        <div className="space-y-4">
          {filteredStores.map((store) => (
            <div key={store.id} className="bg-white shadow-md p-4 rounded-lg">
              <h3 className="text-lg font-semibold">{store.name}</h3>
              <p className="text-gray-600">{store.address}</p>
             
              <p>Your Rating: {renderStars(userRatings[store.id] || 0)}</p>

              {/* Rating Buttons (Stars) */}
              <div className="mt-4 flex gap-4">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    className={`p-2 rounded-lg ${userRatings[store.id] === rating ? 'bg-blue-600' : 'bg-gray-300'}`}
                    onClick={() => handleRatingChange(store.id, rating)}
                  >
                    {rating} ★
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No stores found matching your search criteria.</p>
      )}
    </div>
  );
};

export default StoreListings;
