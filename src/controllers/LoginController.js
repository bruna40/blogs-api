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
const { User } = require('../models');

class LoginController {
    static async login(req, res) {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Some required fields are missing' });
        }
        const user = await User.findOne({
            where: { email } });
        if (!user || user.password !== password) {
            return res.status(400).json({ message: 'Invalid fields' });
        }
        const token = generateToken(email);
        return res.status(200).json({ token });
    }
}

module.exports = LoginController;