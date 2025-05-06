import React, { useState } from 'react';

function RatingForm({ storeId, onSubmit }) {
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ rating, comment, store_id: storeId });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2">
      <label className="block mb-1">Your Rating:</label>
      <select
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        className="border rounded p-1"
      >
        {[1, 2, 3, 4, 5].map((num) => (
          <option key={num} value={num}>{num}</option>
        ))}
      </select>
      <textarea
        placeholder="Leave a comment (optional)"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="border rounded p-1 mt-2 w-full"
      />
      <button type="submit" className="ml-2 bg-blue-500 text-white px-2 py-1 rounded mt-2">
        Submit
      </button>
    </form>
  );
}

export default RatingForm;
