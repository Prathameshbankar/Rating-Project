// src/routes/AdminRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from '../pages/AdminDashboard';
import AddEntity from '../pages/admin/AddEntity';
import UsersList from '../pages/admin/UsersList';

const AdminRoutes = () => {
  return (
    <div className="p-6">
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/add" element={<AddEntity />} />
        <Route path="/users" element={<UsersList />} />
      </Routes>
    </div>
  );
};

export default AdminRoutes;