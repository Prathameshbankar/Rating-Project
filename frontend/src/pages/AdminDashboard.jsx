import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStores: 0,
    totalRatings: 0
  });
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [stores, setStores] = useState([]);
  const [activeTab, setActiveTab] = useState('users');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, usersRes, adminsRes, storesRes] = await Promise.all([
          axios.get('/api/admin/stats', {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
          }),
          axios.get('/api/admin/users', {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
          }),
          axios.get('/api/admin/admins', {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
          }),
          axios.get('/api/admin/stores', {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
          })
        ]);

        setStats(statsRes.data);
        setUsers(usersRes.data);
        setAdmins(adminsRes.data);
        setStores(storesRes.data);
      } catch (err) {
        console.error('Detailed error:', err);
        const errorMessage = err.response?.data?.error || err.response?.data?.message || err.message;
        setError(`Failed to fetch dashboard data: ${errorMessage}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="p-6 text-center">Loading dashboard data...</div>;
  if (error) return (
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

  const renderTable = (data, type) => {
    const columns = {
      users: ['ID', 'Name', 'Email', 'Role', 'Actions'],
      admins: ['ID', 'Name', 'Email', 'Role', 'Actions'],
      stores: ['ID', 'Name', 'Owner', 'Location', 'Actions']
    };

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              {columns[type].map((column) => (
                <th key={column} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap">{item.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.email}</td>
                {type === 'stores' ? (
                  <>
                    <td className="px-6 py-4 whitespace-nowrap">{item.owner}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.location}</td>
                  </>
                ) : (
                  <td className="px-6 py-4 whitespace-nowrap">{item.role}</td>
                )}
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                  <button className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Admin Dashboard</h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow-lg p-6 rounded-xl text-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">Total Users</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.totalUsers}</p>
        </div>
        <div className="bg-white shadow-lg p-6 rounded-xl text-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">Total Stores</h3>
          <p className="text-3xl font-bold text-green-600">{stats.totalStores}</p>
        </div>
        <div className="bg-white shadow-lg p-6 rounded-xl text-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">Total Ratings</h3>
          <p className="text-3xl font-bold text-yellow-600">{stats.totalRatings}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('users')}
              className={`${
                activeTab === 'users'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Users
            </button>
            <button
              onClick={() => setActiveTab('admins')}
              className={`${
                activeTab === 'admins'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Admins
            </button>
            <button
              onClick={() => setActiveTab('stores')}
              className={`${
                activeTab === 'stores'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Stores
            </button>
          </nav>
        </div>
      </div>

      {/* Table Content */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        {activeTab === 'users' && renderTable(users, 'users')}
        {activeTab === 'admins' && renderTable(admins, 'admins')}
        {activeTab === 'stores' && renderTable(stores, 'stores')}
      </div>

      {/* Add New Entity Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New Entity</h2>
        <div className="space-y-4">
          <Link
            to="/admin/add"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-xl transition-all duration-300"
          >
            Add New User / Store / Admin
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
