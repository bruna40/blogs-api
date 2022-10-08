const { User } = require('../models');
const generateToken = require('../utils/generateToken');

class UserController {
  static async getAll(_req, res) {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
    });

    return res.status(200).json(users);
  }

  static async getById(req, res) {
    const { id } = req.params;

    const user = await User.findOne({
      where: { id },
      attributes: { exclude: ['password'] },
    });
    if (!user) {
      return res.status(404).json({ message: 'User does not exist' });
    }
    return res.status(200).json(user);
  }

  static async register(req, res) {
    const { displayName, email, password, image } = req.body;

    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(409).json({ message: 'User already registered' });
    }
    await User.create({ displayName, email, password, image });

    const token = generateToken(email);
    return res.status(201).json({ token });
  }
}

module.exports = UserController;