const generateToken = require('../utils/generateToken');
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