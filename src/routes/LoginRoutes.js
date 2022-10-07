const express = require('express');
const LoginController = require('../controllers/LoginController');

const LoginRouter = express.Router();

LoginRouter.post('/login', LoginController.login);

module.exports = LoginRouter;