const generateToken = require('../utils/JWT');

const { User } = require('../models');

class UserController {
    static async login(req, res) {
        const { email, password } = req.body;
        if (!email && !password) {
            return res.status(400).json({ message: 'Some required fields are missing' });
        }
        const user = await User.findOne({
            attributes: ['id', 'displayName', 'email'],
            where: { email, password } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid fields' });
        }
        const token = generateToken(user.dataValues);
        return res.status(200).json({ token });
    }
    
    static async userAll(req, res) {
        const users = await User.findAll();
        return res.status(200).json(users);
    }  
}

module.exports = UserController;