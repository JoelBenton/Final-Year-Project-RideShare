const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/authenticateToken');

// Public routes (no token required)
router.post('/signup', userController.signup);
router.post('/login', userController.login);

// Protected routes (token required)
router.post('/logout', authenticateToken, userController.logout);

// Endpoint to check refresh token validity
router.post('/check-access-token', authenticateToken, (req, res) => {
    // If we reach this point, the refresh token is valid
    res.status(200).json({ message: 'Access token is valid.', accessToken: req.user.accessToken });
  });


module.exports = router;