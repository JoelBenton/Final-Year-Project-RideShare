const bcrypt = require('bcrypt');
const cuid = require('cuid');
const db = require('../config/dbConfig');
const { generateAccessToken, generateRefreshToken, removeRefreshTokenForUser, removeRefreshToken } = require('../utils/TokenUtils');
const mysql = require('mysql')
const jwt = require('jsonwebtoken');

// Sign up route
exports.signup = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        // Check if user already exists
        db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
            if (results === undefined) {
                return res.status(404).json({ message: "Database Table Doesn't Exist."})
            }
            else if (results.length > 0) {
                return res.status(400).json({ message: 'Email already registered' });
            }

            // Hash the password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Generate a CUID for the user ID
            const userId = cuid();

            // Insert the new user into the database
            const sql = 'INSERT INTO users (id, email, password) VALUES (?, ?, ?)';
            try {
                await db.query(sql, [userId, email, hashedPassword]);
                res.status(201).json({ message: 'User registered' });
            } catch (error) {
                console.log(error);
                res.status(500).json({ message: 'Error registering user' });
            }
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', err });
    }
};

exports.login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email) {
        return res.status(400).json({ message: "No Email Provided"})
    } else if (!password) {
        return res.status(400).json({ message: "No Password Provided"})
    }

    db.getConnection(async (err, connection) => {
        if (err) throw err;
        const sqlSearch = "Select * from users where email = ?";
        const search_query = mysql.format(sqlSearch, [email]);

        await connection.query(search_query, async (err, result) => {
            connection.release();
            if (err) throw err;
            if (result.length == 0) {
                return res.status(400).json({ message: 'User with that email doesn\'t exists'});
            } else {
                const hashedPassword = result[0].password;
                if (await bcrypt.compare(password, hashedPassword)) {

                    const userId = result[0].id

                    await removeRefreshTokenForUser(userId);

                    console.log('Generating Tokens')

                    const accessToken = generateAccessToken( userId );
                    const refreshToken = await generateRefreshToken( userId );

                    return res.status(200).json({
                        message: "Login Successful",
                        accessToken,
                        refreshToken,
                        userId: userId,
                    });
                } else {
                    return res.status(400).json( { message: "Password incorrect!" });
                }
            }
        });
    });
};

exports.logout = async (req, res) => {
    const { refreshToken } = req.body;

    console.log(refreshToken)
  
    try {
      await removeRefreshToken(refreshToken);
      res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error logging out' });
    }
};

exports.refresh = async (req, res) => {
    const { refreshToken } = req.body;
  
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, async (err, user) => {
      if (err) return res.status(403).json({ message: 'Invalid refresh token' });
  
      // Check if the refresh token exists and is not expired
      const sql = 'SELECT * FROM refresh_tokens WHERE token = ? AND expires_at > NOW()';
      const formatted_sql = mysql.format(sql, [refreshToken])
      const [tokenRecord] = await db.query(formatted_sql);
  
      if (!tokenRecord) return res.status(403).json({ message: 'Refresh token not found or expired' });
  
      // Generate new access token
      const newAccessToken = generateAccessToken( user.id );
  
      // Remove the old refresh token
      await removeRefreshToken(refreshToken);
  
      // Generate a new refresh token and store it
      const newRefreshToken = await generateRefreshToken( user.id );
  
      res.json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
      });
    });
};