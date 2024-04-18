const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const messageRoutes = require('./routes/messageRoutes');
const userRoutes = require('./routes/userRoutes'); // Assuming user authentication is managed here
const connectDb = require('./config/dbConnection'); // Database connection setup
const errorHandler = require('./middleware/errorHandler'); // Global error handler

const app = express();
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from 'public' directory

// Database connection
connectDb();

// Routes
app.use('/messages', messageRoutes);
app.use('/api/users', userRoutes);

// Use error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
