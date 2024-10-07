const jwt = require('jsonwebtoken');
const { findValidRefreshTokenByUserId } = require('./../models/refreshTokenModel');
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
    return res.status(401).json({ message: 'Device ID missing.' });
  }

  try {
    const user = await verifyJwt(accessToken, process.env.ACCESS_TOKEN_SECRET); // Await the token verification

    console.log('Token not Expired.');
    req.user = { id: user.id, accessToken }; // Attach user info to the request object
    return next(); // Move to the next middleware

  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      console.log('Token Expired');
      const decodedToken = jwt.decode(accessToken);
      const userId = decodedToken.id;

      // Query the database for the active refresh token using the new function
      const validRefreshToken = await findValidRefreshTokenByUserId(userId);

      // Check if the refresh token is valid and belongs to the correct device
      if (!validRefreshToken || validRefreshToken.user_deviceId !== deviceId) {
        return res.status(401).json({ message: 'Invalid or expired refresh token. Please sign in again.' });
      }

      // Generate new tokens
      console.log('Generating new access token');
      const newAccessToken = generateAccessToken(userId);
      await generateRefreshToken(userId, deviceId);

      // Remove the old refresh token and insert the new one
      await removeRefreshToken(validRefreshToken.token); // Remove old refresh token

      // Attach the new tokens and user info to the request object
      req.user = { id: userId, accessToken: newAccessToken };
      return next();
    } else {
      console.error('Invalid access token:', err);
      return res.status(403).json({ message: 'Invalid access token' });
    }
  }
};

module.exports = authenticateToken;