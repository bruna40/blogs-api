require('dotenv');
const jwt = require('jsonwebtoken');

const { User } = require('../models');

const decode = (token) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.data;
};

class UserService {
    static async idToken(xablau) {
        const { id } = await User.findOne({ where: { email: decode(xablau) } });
        return id;
    }

    static async deleteToken(xablau) {
        const userId = await this.idToken(xablau);
        await User.destroy({ where: { id: userId } });
    }
}

module.exports = UserService;