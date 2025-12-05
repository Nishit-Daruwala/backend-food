import { db } from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// =================== REGISTER ===================
export const register = async (req, res) => {
    const { username, mobile_no, email, password } = req.body;

    if (!username || !mobile_no || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        await db.query(
            'INSERT INTO users (username, mobile_no, email, password) VALUES (?, ?, ?, ?)',
            [username, mobile_no, email, hashedPassword]
        );

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'Email already exists' });
        }
        console.log("REGISTER ERROR >", error);
        res.status(500).json({ message: 'Server error' });
    }
};


// =================== LOGIN ===================
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // FIX 1: table name must be `users`
        const [rows] = await db.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        const user = rows[0];
        if (!user) return res.status(400).json({ message: 'Invalid Email or Password' });

        // Password check
        const isMatch = await bcrypt.compare(password, user.password);

        // FIX 2: typo -> `status` not `stauts`
        if (!isMatch) return res.status(400).json({ message: 'Invalid Credentials' });

        // JWT Token
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        // FIX 3: return correct email key
        res.json({
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                mobile_no: user.mobile_no
            }
        });

    } catch (error) {
        console.log("LOGIN ERROR >", error); // helps debugging
        res.status(500).json({ message: 'Server Error' });
    }
};
