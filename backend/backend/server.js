import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';

const app = express();
app.use(cors());
app.use(express.json());

// ==============================================================================
// WEEK 7 - FIG 1: Backend Registration Controller Processing Bcrypt Hashing
// ==============================================================================
app.post('/api/auth/register', async (req, res) => {
    const { username, password, role } = req.body;
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        res.status(201).json({ success: true, message: 'User registered safely!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(5000, () => console.log('Backend engine online at http://localhost:5000'));
