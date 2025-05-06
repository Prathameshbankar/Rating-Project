import React from 'react';

function StoreCard({ store }) {
  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-lg font-semibold">{store.name}</h2>
      <p>{store.address}</p>
      <p>Average Rating: {store.averageRating}</p>
    </div>
  );
}

export default StoreCard;
