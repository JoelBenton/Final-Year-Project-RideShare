const db = require('../config/dbConfig'); // Import your database connection
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
  // Get the token from the Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Get the token part after 'Bearer'

  if (!token) {
    return res.status(401).json({ message: 'Authorization token missing' });
  }

  // Query the database to find the token and check if it is expired
  const query = 'SELECT * FROM refresh_tokens WHERE token = ? AND expires_at > CURRENT_TIMESTAMP';

  db.query(query, [token], (error, results) => {
    if (error) {
      console.error('Database query error:', error);
      return res.status(500).json({ message: 'Database query error' });
    }

    if (results.length === 0) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }

    const tokenData = results[0];
    
    // Optionally: Verify token data or handle additional logic here
    
    // Attach user information to the request object
    req.user = { id: tokenData.user_id };
    
    // Proceed to the next middleware or route handler
    next();
  });
};

module.exports = authenticateToken;