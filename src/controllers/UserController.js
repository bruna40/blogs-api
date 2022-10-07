require('dotenv/config');
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const generateToken = (email) => {
    const payload = {
        data: email,
    };
    const jwtCongig = {
        expiresIn: '15m',
        algorithm: 'HS256',
    };
    const token = jwt.sign(payload, secret, jwtCongig);
    return token;
};

const { User } = require('../models');

class UserController {
    static async register(req, res) {
        const { displayName, email, password, image } = req.body;
        await User.create({ displayName, email, password, image });
        const token = generateToken(email);
        return res.status(201).json({ token });
    }

    static async getAll(_req, res) {
        const users = await User.findAll(
            { attributes: { exclude: ['password'] } },
        );
        return res.status(200).json(users);
    }

    static async getById(req, res) {
        const { id } = req.params;
        const user = await User.findOne({ 
            where: { id },
            attributes: { exclude: ['password'] } });
        if (!user) {
            return res.status(404).json({ message: 'User does not exist' });
        }
        return res.status(200).json(user);
    }
}
module.exports = UserController;