const decodeTokenEmail = require('../utils/decodeTokenEmail');
const { User } = require('../models');

class UserService {
  static async findUser(jwtToken) {
    const { id } = await User.findOne({ where: { email: decodeTokenEmail(jwtToken) } });
    return id;
  }

  static async del(jwtToken) {
    const userId = await this.findUser(jwtToken);
    await User.destroy({ where: { id: userId } });
  }
}

module.exports = UserService;