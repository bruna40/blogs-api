require('dotenv/config');
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const generateToken = (email) => {
    const payload = {
        email,
    };
    const jwtCongig = {
        expiresIn: '15m',
        algorithm: 'HS256',
    };
    const token = jwt.sign(payload, secret, jwtCongig);
    return token;
};

module.exports = {
    generateToken,

};