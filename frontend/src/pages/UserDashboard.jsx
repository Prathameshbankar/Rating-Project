// UserDashboard.js
import React, { useState, useEffect } from 'react';
import StoreListings from './StoreListings';

const UserDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [userRatings, setUserRatings] = useState({}); // Object to store user ratings

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
      <p className="mb-6">Search and rate your favorite stores!</p>

      {/* Search Bar */}
      <input
        type="text"
        className="mb-4 p-2 border border-gray-300 rounded-lg w-full"
        placeholder="Search by Store Name or Address"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Store Listings Component */}
      <StoreListings 
        searchTerm={searchTerm} 
        userRatings={userRatings} 
        setUserRatings={setUserRatings} 
      />
    </div>
  );
};

export default UserDashboard;
