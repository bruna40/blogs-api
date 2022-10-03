const regexEmail = require('../utils/regexEmail');
const { User } = require('../models');

const registerValidation = async (req, res, next) => {
    const { displayName, email, password } = req.body;
    if (displayName.length < 8) {
        const erroMenssagem = '"displayName" length must be at least 8 characters long';
        return res.status(400).json({ message: erroMenssagem });
    }
    if (password.length < 6) {
        const erroMenssagem = '"password" length must be at least 6 characters long';
        return res.status(400).json({ message: erroMenssagem });
    }
    if (!regexEmail(email)) {
        const erroMenssagem = '"email" must be a valid email';
        return res.status(400).json({ message: erroMenssagem });
    }
    const verificaEmail = await User.findOne({ where: { email } });
    if (verificaEmail !== null) {
        return res.status(409).json({ message: 'User already registered' });
    }

    next();
};

module.exports = registerValidation;