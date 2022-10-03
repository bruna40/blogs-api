const { Router } = require('express');
const LoginController = require('../controllers/LoginController');

const LoginRouter = Router();

LoginRouter.post('/', LoginController.login);

module.exports = LoginRouter;