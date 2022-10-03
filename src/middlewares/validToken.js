require('dotenv/config');
const jwt = require('jsonwebtoken');
const UserService = require('../services/UserService');

const secret = process.env.JWT_SECRET || 'suaSenha';

const validToken = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Token not found' });
    try {
        const decoded = jwt.verify(token, secret);
        // const user = await UserService.getById(decoded.id);
        const user = await UserService.getById(decoded.data.id);
        if (!user) return res.status(401).json({ message: 'Expired or invalid token' });
        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = validToken;