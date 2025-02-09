const jwt = require('jsonwebtoken');
const { User } = require('../models');

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'No token provided' });
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Invalid token format' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findByPk(decoded.userId);
        if (!user) {
            return res.status(401).json({ error: 'User does not exist' });
        }
        if (user.role !== decoded.role) {
            return res.status(401).json({ error: 'Role mismatch' });
        }

        req.user = {
            userId: user.id,
            role: user.role
        };
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Token is invalid or expired' });
    }
};
