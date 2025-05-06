import React, { useState } from 'react';

const UpdatePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle password update logic (send data to backend)
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-20">
      <h1 className="text-2xl font-semibold mb-4">Update Password</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="currentPassword" className="block text-gray-700">Current Password</label>
          <input
            type="password"
            id="currentPassword"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="newPassword" className="block text-gray-700">New Password</label>
          <input
            type="password"
            id="newPassword"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-gray-700">Confirm New Password</label>
          <input
            type="password"
            id="confirmPassword"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md">
          Update Password
        </button>
      </form>
    </div>
  );
};

export default UpdatePassword;
