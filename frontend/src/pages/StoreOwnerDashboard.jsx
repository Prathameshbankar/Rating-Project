import React, { useState, useEffect } from 'react';

const StoreOwnerDashboard = () => {
  const [ratings, setRatings] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    // Fetch ratings data from the backend (replace with your API endpoint)
    const fetchRatings = async () => {
      const response = await fetch('/api/store/ratings'); // Example endpoint
      const data = await response.json();
      setRatings(data.ratings);

      // Calculate average rating
      const avg =
        data.ratings.reduce((acc, rating) => acc + rating.rating, 0) /
        data.ratings.length;
      setAverageRating(avg);
    };

    fetchRatings();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Store Owner Dashboard</h1>
      <p className="text-gray-600 mb-4">View the ratings submitted to your store.</p>

      <div className="mb-6">
        <h3 className="text-lg font-semibold">Average Rating</h3>
        <p className="text-xl">{averageRating.toFixed(2) || 'N/A'}</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold">User Ratings</h3>
        {ratings.length > 0 ? (
          <table className="min-w-full table-auto border-collapse mt-4">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">Name</th>
                <th className="px-4 py-2 border-b">Email</th>
                <th className="px-4 py-2 border-b">Rating</th>
              </tr>
            </thead>
            <tbody>
              {ratings.map((rating) => (
                <tr key={rating.userId}>
                  <td className="px-4 py-2 border-b">{rating.userName}</td>
                  <td className="px-4 py-2 border-b">{rating.userEmail}</td>
                  <td className="px-4 py-2 border-b">{rating.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No ratings found for your store yet.</p>
        )}
      </div>
    </div>
  );
};

export default StoreOwnerDashboard;
