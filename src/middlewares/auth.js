const jwt = require('jsonwebtoken');
require('dotenv');
const { User } = require('../models');

module.exports = async (request, response, next) => {
  const { authorization } = request.headers;
  if (!authorization) {
    return response.status(401).json({ message: 'Token not found' });
  }

  try {
    const { data } = jwt.verify(authorization, process.env.JWT_SECRET);
    const user = await User.findOne({ where: { email: data } });
    if (!user) {
      return response.status(401).json({ message: 'Expired or invalid token' });
    }

    next();
  } catch (error) {
    return response.status(401).json({ message: 'Expired or invalid token' });
  }
};