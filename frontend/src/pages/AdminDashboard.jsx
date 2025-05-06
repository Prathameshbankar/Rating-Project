import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Admin Dashboard</h1>

      {/* Instructions */}
      <p className="mb-8 text-lg text-gray-700 text-center">
        Manage users, stores, and view overall platform statistics here.
      </p>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow-lg p-6 rounded-xl text-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">Total Users</h3>
          <p className="text-3xl font-bold text-blue-600">1,235</p>
        </div>
        <div className="bg-white shadow-lg p-6 rounded-xl text-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">Total Stores</h3>
          <p className="text-3xl font-bold text-green-600">320</p>
        </div>
        <div className="bg-white shadow-lg p-6 rounded-xl text-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">Total Ratings</h3>
          <p className="text-3xl font-bold text-yellow-600">5,890</p>
        </div>
      </div>

      {/* Add New Entity Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New Entity</h2>
        <p className="text-gray-600 mb-6">You can add a new user, store, or admin.</p>
        
        {/* Link to Add Forms */}
        <div className="space-y-4">
          <Link
            to="/admin/add"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-xl transition-all duration-300"
          >
            Add New User / Store / Admin
          </Link>
        </div>
      </div>

      {/* View Lists Section */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">View Entities</h2>
        <div className="space-y-4">
          <Link
            to="/admin/users"
            className="inline-block bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg text-xl transition-all duration-300"
          >
            View Users
          </Link>
          <Link
            to="/admin/stores"
            className="inline-block bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg text-xl transition-all duration-300"
          >
            View Stores
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
