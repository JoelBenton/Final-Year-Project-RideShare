const express = require('express');
require('dotenv').config();
const app = express();
const userRoutes = require('./src/routes/userRoutes');

const port = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON bodies

// Routes
app.use('/user', userRoutes);

app.listen(port, () => console.log(`Server started on port ${port}...`)); 