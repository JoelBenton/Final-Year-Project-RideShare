const jwt = require('jsonwebtoken');
const db = require('../config/dbConfig'); // Your database connection module
const mysql = require('mysql');
require('dotenv').config();
const { generateAccessToken, generateRefreshToken, removeRefreshToken } = require('../utils/TokenUtils');

// Promisify jwt.verify
const verifyJwt = async (token, secret) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, user) => {
      if (err) reject(err);
      else resolve(user);
    });
  });
};

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const deviceId = req.headers['deviceid'];
  const accessToken = authHeader && authHeader.split(' ')[1]; // Get the token part after 'Bearer'

  if (!accessToken) {
    return res.status(401).json({ message: 'Authorization token missing' });
  }

  if (!deviceId) {
    return res.status(401).json({ message: 'Device ID missing.'})
  }

  try {
    const user = await verifyJwt(accessToken, process.env.ACCESS_TOKEN_SECRET); // Await the token verification

    console.log('Token not Expired.');
    req.user = { id: user.id, accessToken }; // Attach user info to the request object
    return next(); // Move to the next middleware

  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      console.log('Token Expired');
      const decodedToken = jwt.decode(accessToken)
      const userId = decodedToken.id;

      // Query the database for the active refresh token
      const query = 'SELECT * FROM refresh_tokens WHERE user_id = ? AND expires_at > CURRENT_TIMESTAMP';
      const formatted_sql = mysql.format(query, [userId]);

      db.query(formatted_sql, async (dbErr, results) => {
        if (dbErr) {
          console.error('Database error:', dbErr);
          return res.status(500).json({ message: 'Database query error' });
        }

        if (results.length === 0) {
          return res.status(401).json({ message: 'Invalid or expired refresh token. Please sign in again.' });
        }

        const tokenData = results[0];
        const currentRefreshToken = tokenData.token;

        if (tokenData.user_deviceId != deviceId) {
          return res.status(401).json({ message: 'Invalid Device ID. Please sign in again.' })
        }

        // Generate new tokens
        console.log('Generating new access token');
        const newAccessToken = generateAccessToken(userId);
        await generateRefreshToken(userId, deviceId);

        // Remove the old refresh token and insert the new one
        await removeRefreshToken(currentRefreshToken); // Remove old refresh token

        // Attach the new tokens and user info to the request object
        req.user = { id: userId, accessToken: newAccessToken }; 
        return next();
      });
    } else {
      console.error('Invalid access token:', err);
      return res.status(403).json({ message: 'Invalid access token' });
    }
  }
};

module.exports = authenticateToken;