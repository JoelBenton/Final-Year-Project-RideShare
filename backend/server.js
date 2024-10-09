const express = require('express');
require('dotenv').config();
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON bodies

app.listen(port, () => console.log(`Server started on port ${port}...`)); 