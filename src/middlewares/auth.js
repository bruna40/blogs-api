const jwt = require('jsonwebtoken');
require('dotenv');
const { User } = require('../models');

const auth = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  } 
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Expired or invalid token' });
      } 
        req.email = decoded.data;
        const user = await User.findOne({ where: { email: req.email } });
        if (!user) {
          return res.status(401).json({ message: 'Expired or invalid token' });
        } 
          req.user = user;
          next();
    });
};

module.exports = auth;
