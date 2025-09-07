const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/auth');
require('./db'); // Initializes the database connection


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL, // Allow the React app to make requests
    credentials: true
}));
app.use(express.json()); // To parse JSON bodies
app.use(cookieParser()); // To parse cookies

// Session Configuration
app.use(session({
    secret: process.env.SESSION_SECRET, // Replace with a real secret key
    resave: false,
    saveUninitialized: false, // Don't create session until something stored
    cookie: {
        secure: false, // In production, set this to true for HTTPS
        httpOnly: true, // Prevents client-side JS from reading the cookie
        maxAge: 1000 * 60 * 60 * 24 // Cookie expiry time: 1 day
    }
}));

// Routes
app.use('/api/auth', authRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});