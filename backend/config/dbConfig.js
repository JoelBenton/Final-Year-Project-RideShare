const mysql = require('mysql');
require('dotenv').config();

const db = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
});

db.getConnection((err, connection) => {
    if (err) throw err;
    console.log('DB connected successfully: ' + connection.threadId);
    connection.release();
});

module.exports = db;