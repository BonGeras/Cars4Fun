const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;

        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already taken' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            password: hashedPassword,
            role: 'user'
        });

        return res.status(201).json({ message: 'User created', userId: newUser.id });
    } catch (error) {
        console.error('Error in register:', error);
        return res.status(500).json({ error: 'Server error' });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const tokenPayload = { userId: user.id, role: user.role };
        const token = jwt.sign(tokenPayload, process.env.SECRET_KEY, {
            expiresIn: '1d'
        });

        const response = { 
            message: 'Logged in', 
            token, 
            role: user.role,
            userId: user.id
        };

        return res.json(response);
    } catch (error) {
        console.error('Error in login:', error);
        return res.status(500).json({ error: 'Server error' });
    }
};
