const bcrypt = require('bcrypt');
const cuid = require('cuid');
const db = require('../config/dbConfig');
const { generateAccessToken, generateRefreshToken, removeRefreshTokenForUser } = require('../utils/TokenUtils');
const mysql = require('mysql');

// Sign up route
exports.signup = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        // Check if user already exists
        db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
            if (error) {
                return res.status(500).json({ message: 'Database query error' });
            }
            if (results.length > 0) {
                return res.status(400).json({ message: 'Email already registered' });
            }

            // Hash the password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Generate a CUID for the user ID
            const userId = cuid();

            // Insert the new user into the database
            const sql = 'INSERT INTO users (id, email, password) VALUES (?, ?, ?)';
            db.query(sql, [userId, email, hashedPassword], (error) => {
                if (error) {
                    return res.status(500).json({ message: 'Error registering user' });
                }
                res.status(201).json({ message: 'User registered' });
            });
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Login route
exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
            if (error) {
                return res.status(500).json({ message: 'Database query error' });
            }
            if (results.length === 0) {
                return res.status(400).json({ message: 'User with that email doesn\'t exist' });
            }

            const user = results[0];
            const hashedPassword = user.password;
            if (await bcrypt.compare(password, hashedPassword)) {
                const userId = user.id;
                const deviceId = req.headers['deviceid'];

                console.log('DeviceID - ' + deviceId)

                if (!deviceId) {
                    return res.status(400).json({ message: "No DeviceId!"})
                }

                // Remove any existing refresh token for the user
                await removeRefreshTokenForUser(userId, deviceId);

                // Generate new access token
                const accessToken = generateAccessToken(userId);

                // Generate new refresh Token (Won't be passed to frontend)
                await generateRefreshToken(userId);

                res.status(200).json({
                    message: "Login Successful",
                    accessToken, // Send the access token only
                    userId
                });
            } else {
                return res.status(400).json({ message: "Password incorrect!" });
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Logout route
exports.logout = async (req, res) => {
    const userId = req.user.id;

    if (!userId) {
        return res.status(400).json({ message: 'No userId Found' });
    }

    try {
        console.log('Logging Out')
        await removeRefreshTokenForUser(userId);
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error logging out', error });
    }
};