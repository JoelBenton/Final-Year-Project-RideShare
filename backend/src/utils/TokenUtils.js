const jwt = require('jsonwebtoken');
const {createRefreshToken, deleteRefreshToken, findRefreshTokenByUserId } = require('./../models/refreshTokenModel'); // Adjust the path as necessary
require('dotenv').config();

// Function to generate an access token
const generateAccessToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' }); // Set the expiration to 15 minutes
};

// Function to generate a refresh token
const generateRefreshToken = async (userId, userDeviceId) => {
  const refreshToken = jwt.sign({ id: userId, deviceId: userDeviceId }, process.env.REFRESH_TOKEN_SECRET);

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7); // Token expires in 7 days

  try {
    // Use the model to create or update the refresh token
    await createRefreshToken(refreshToken, userId, userDeviceId, expiresAt);
  } catch (error) {
    console.log('Error storing refresh token:', error);
    throw new Error('Error storing refresh token');
  }

  return refreshToken;
};

// Function to remove a specific refresh token
const removeRefreshToken = async (token) => {
  try {
    await deleteRefreshToken(token);
  } catch (error) {
    console.error('Error removing refresh token:', error);
  }
};

// Function to remove all refresh tokens for a user
const removeRefreshTokenForUser = async (userId) => {
  try {
    const userTokens = await findRefreshTokenByUserId(userId);
    if (userTokens) {
      await deleteRefreshToken(userTokens.token); // Assuming you want to delete by token here
    }
  } catch (error) {
    console.error('Error removing user\'s refresh token:', error);
  }
};

module.exports = { generateAccessToken, generateRefreshToken, removeRefreshToken, removeRefreshTokenForUser };