const express = require('express');
const UserController = require('../controllers/UserController');
// const validToken = require('../middlewares/validToken');
const verifyToken = require('../middlewares/verifyJWT');

const UserRouter = express.Router();

UserRouter
    .post('/login', UserController.login)
    .get('/user', verifyToken, UserController.userAll);

module.exports = UserRouter;