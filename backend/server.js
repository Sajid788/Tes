// Import required packages
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import DB connection and PORT
const { connection, PORT } = require('./config/database');

// Import route files
const revenueRoutes = require('./routes/revenue');

// Initialize Express app
const app = express();

// Middlewares
app.use(cors());                // Enable CORS for all routes
app.use(express.json());        // Parse incoming JSON requests

// Routes
app.use('/api/revenue', revenueRoutes);   // Revenue-related routes

// Health check route
app.get('/', (req, res) => {
  res.json({ status: 'OK', message: 'API is running' });
});

// 404 Route handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, async () => {
  try {
    await connection;   // Wait for DB connection
    console.log("✅ Connected to Database");
  } catch (error) {
    console.error(`❌ Database connection error: ${error}`);
  }

  console.log(` Server running on PORT: ${PORT}`);
});
