const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db');
const router = express.Router();

const saltRounds = 10;

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.session.userId) {
        next();
    } else {
        res.status(401).json({ message: 'You are not authorized' });
    }
};

// POST /api/auth/register - User Registration
router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const sql = `INSERT INTO users (email, password) VALUES (?, ?)`;
        
        db.run(sql, [email, hashedPassword], function (err) {
            if (err) {
                if (err.message.includes('UNIQUE constraint failed')) {
                    return res.status(409).json({ message: 'Email already registered' });
                }
                return res.status(500).json({ message: 'Database error on registration' });
            }
            res.status(201).json({ message: 'User registered successfully', userId: this.lastID });
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error on hashing password' });
    }
});

// POST /api/auth/login - User Login
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const sql = `SELECT * FROM users WHERE email = ?`;
    db.get(sql, [email], async (err, user) => {
        if (err) {
            return res.status(500).json({ message: 'Database error on login' });
        }
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (match) {
            req.session.userId = user.id; // Create session
            res.status(200).json({ message: 'Login successful', user: { id: user.id, email: user.email } });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    });
});

// POST /api/auth/logout - User Logout
router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Could not log out, please try again' });
        }
        res.clearCookie('connect.sid'); // Clears the session cookie
        res.status(200).json({ message: 'Logout successful' });
    });
});

// GET /api/auth/dashboard - Protected Route Example
router.get('/dashboard', isAuthenticated, (req, res) => {
    // This route is protected. Only logged-in users can access it.
    res.status(200).json({ message: `Welcome to the dashboard, user ID: ${req.session.userId}` });
});


module.exports = router;