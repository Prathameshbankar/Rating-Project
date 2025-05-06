// components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Logout the user
    navigate('/'); // Redirect to home page
  };

  return (
    <nav className="bg-slate-900 p-4">
      <div className="flex justify-between items-center">
        <Link to="" className="text-white text-lg font-semibold">Rating System</Link>

        <div>
          {user ? (
            <>
              <span className="text-white mr-4">Welcome, {user.username || user.email}</span>
              <button
                onClick={handleLogout}
                className="text-white bg-red-500 px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
          
              <Link to="/signup" className="text-white mr-4">Sign Up</Link>
              <Link to="/" className="text-white">Login</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
