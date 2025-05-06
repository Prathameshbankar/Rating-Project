// src/components/ProtectedAdminRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedAdminRoute = () => {
  const { currentUser } = useAuth();

  return currentUser?.role === 'admin' ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedAdminRoute;