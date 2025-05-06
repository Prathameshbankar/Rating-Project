import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Signup = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const result = await signup(form.username, form.email, form.password);
    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000); // Redirect after 2 seconds
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg p-6 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Sign Up</h2>
        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
        {success ? (
          <p className="text-green-600 mb-4 text-center">Registration successful! Redirecting to login...</p>
        ) : (
          <>
            <input
              name="username"
              placeholder="Username"
              onChange={handleChange}
              className="border p-2 rounded w-full mb-4"
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              className="border p-2 rounded w-full mb-4"
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              className="border p-2 rounded w-full mb-4"
              required
            />
            <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
              Register
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default Signup;