const bcrypt = require('bcrypt');
const cuid = require('cuid');
const { findUserByEmail, createUser } = require('./../models/userModel');
const { generateAccessToken, generateRefreshToken, removeRefreshTokenForUser } = require('../utils/TokenUtils');

// Sign up route
exports.signup = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        // Check if user already exists
        const existingUser = await findUserByEmail(email);

        // If user exists, delete their existing refresh token
        if (existingUser) {
            await removeRefreshTokenForUser(existingUser.id); // Delete any existing refresh token for the user
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create the new user
        const newUser = await createUser(email, hashedPassword);
        res.status(201).json({ message: 'User registered', userId: newUser.id });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Login route
exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(400).json({ message: 'User with that email doesn\'t exist' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            const userId = user.id;
            const deviceId = req.headers['deviceid'];

            if (!deviceId) {
                return res.status(400).json({ message: "No DeviceId!" });
            }

            // Generate new access token
            const accessToken = generateAccessToken(userId);

            // Generate / update refresh token
            const refreshToken = await generateRefreshToken(userId, deviceId); // Now awaits the token generation
            res.status(200).json({
                message: "Login Successful",
                accessToken, // Send the access token only
                userId,
            });
        } else {
            return res.status(400).json({ message: "Password incorrect!" });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Logout route
exports.logout = async (req, res) => {
    const userId = req.user.id; // Assuming req.user is populated with user info from authentication middleware

    if (!userId) {
        return res.status(400).json({ message: 'No userId Found' });
    }

    try {
        console.log('Logging Out');
        await removeRefreshTokenForUser(userId); // Remove the refresh token logic
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error logging out', error: error.message });
    }
};