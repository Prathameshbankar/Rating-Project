const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const signup = async (req, res) => {
  const { username, email, password, role, address } = req.body;
  try {
    const existingUser = await User.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.createUser(username, email, hashedPassword, role, address);
    res.status(201).json({ message: 'User created successfully', user: { id: newUser.id, email: newUser.email } });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error during signup' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { identifier } = req.body;

    // Check if identifier is email or username
    const isEmail = identifier.includes('@');
    let user;

    if (isEmail) {
      user = await User.findUserByEmail(identifier);
    } else {
      user = await User.findUserByUsername(identifier);
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'No account found with this username or email'
      });
    }

    // If user exists, return success message
    res.json({
      success: true,
      message: 'Account verified. Please contact the administrator to reset your password.'
    });
  } catch (error) {
    console.error('Error in forgot password:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing forgot password request'
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { identifier, newPassword } = req.body;

    if (!identifier || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Identifier and new password are required'
      });
    }

    // Check if identifier is email or username
    const isEmail = identifier.includes('@');
    let user;

    if (isEmail) {
      user = await User.findUserByEmail(identifier);
    } else {
      user = await User.findUserByUsername(identifier);
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'No account found with this username or email'
      });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    const updatedUser = await User.updatePassword(user.id, hashedPassword);
    
    if (!updatedUser) {
      throw new Error('Failed to update password');
    }

    res.json({
      success: true,
      message: 'Password has been reset successfully. Please login with your new password.'
    });
  } catch (error) {
    console.error('Error in reset password:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error resetting password'
    });
  }
};

module.exports = {
  signup,
  login,
  forgotPassword,
  resetPassword
};
