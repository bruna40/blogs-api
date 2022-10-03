require('dotenv/config');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const secret = process.env.JWT_SECRET || 'suaSenha';
const isBodyValid = (email, password) => email || password;

class LoginController {
    static async login(req, res) {
        try {
            const { email, password } = req.body;
            if (!isBodyValid(email, password)) {
                return res.status(400).json({ message: 'Some required fields are missing' });
            }
            const user = await User.findOne({ where: { email } });
            if (!user || !user.password !== password) {
                return res.status(400).json({ message: 'Invalid fields' });
            }
            const jwtConfig = {
                expiresIn: '7d',
                algorithm: 'HS256',
            };
            const token = jwt.sign({ data: { id: user.id } }, secret, jwtConfig);
            return res.status(200).json({ token });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}

module.exports = LoginController;