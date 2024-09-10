const jwt = require('jsonwebtoken');
const db = require('../config/dbConfig'); // Your database connection module
const mysql = require('mysql');
require('dotenv').config();

// Function to generate an access token
const generateAccessToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' }); // Set the expiration to 15 minutes
};

// Function to generate a refresh token
const generateRefreshToken = async (userId) => {
  const refreshToken = jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET);

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7); // Token expires in 7 days

  try {
    // Insert the refresh token into the database
    const sql = 'INSERT INTO refresh_tokens (token, user_id, expires_at) VALUES (?, ?, ?)';
    const formatted_sql = mysql.format(sql, [refreshToken, userId, expiresAt]);

    await db.query(formatted_sql);
  } catch (error) {
    console.log('Error storing refresh token:', error);
    throw new Error('Error storing refresh token');
  }

  return refreshToken;
};

const removeRefreshToken = async (token) => {
  try {
    const sql = 'DELETE FROM refresh_tokens WHERE token = ?';
    const formatted_sql = mysql.format(sql, [token]);

    await db.query(formatted_sql);
  } catch (error) {
    console.error('Error removing refresh token:', error);
  }
};


const removeRefreshTokenForUser = async (user) => {
  try {
    const sql = 'DELETE FROM refresh_tokens WHERE user_id = ?';
    const formatted_sql = mysql.format(sql, [user]);

    await db.query(formatted_sql);
  } catch (error) {
    console.error('Error removing users refresh token:', error);
  }
};

module.exports = { generateAccessToken, generateRefreshToken, removeRefreshToken, removeRefreshTokenForUser };