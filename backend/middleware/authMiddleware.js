const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    console.log('Auth header:', authHeader); // Debug log

    if (!authHeader) {
      console.log('No authorization header found');
      return res.status(401).json({ 
        success: false,
        message: 'Access token missing. Please log in to continue.' 
      });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      console.log('No token found in authorization header');
      return res.status(401).json({ 
        success: false,
        message: 'Invalid authorization header format' 
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error('Token verification error:', err.message);
        return res.status(403).json({ 
          success: false,
          message: 'Invalid or expired token. Please log in again.' 
        });
      }

      // Add user info to request
      req.user = {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role
      };
      
      console.log('User authenticated:', req.user); // Debug log
      next();
    });
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Internal server error during authentication' 
    });
  }
};

module.exports = authenticateToken;
