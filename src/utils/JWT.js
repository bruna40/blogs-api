require('dotenv/config');
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'suaSenha';

const generateToken = ({ id, email, displayName }) => {
    const payload = {
        id,
        email,
        displayName,
    };
    const jwtCongig = {
        expiresIn: '15m',
        algorithm: 'HS256',
    };
    const token = jwt.sign(payload, secret, jwtCongig);
    return token;
};

module.exports = generateToken;