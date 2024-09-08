const bcrypt = require('bcrypt');
const db = require('../config/dbConfig');
const generateAccessToken = require('../utils/generateAccessToken');
const mysql = require('mysql')

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

            // Insert user into the database
            db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword], (err, result) => {
                if (err) {
                    return res.status(500).json({ message: 'Database error', err });
                }

                res.status(201).json({ message: 'User created successfully' });
            });
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
                    return res.status(200).json({ message: "Login Successful"})
                } else {
                    return res.status(400).json( { message: "Password incorrect!" });
                }
            }
        });
    });
};