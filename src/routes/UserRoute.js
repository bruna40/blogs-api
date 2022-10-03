const express = require('express');
const UserController = require('../controllers/UserController');
const verifyJWT = require('../middlewares/verifyJWT');
const registerValidation = require('../middlewares/registerValidation');

const UserRouter = express.Router();

UserRouter
    .post('/login', UserController.login)
    .post('/user', registerValidation, UserController.register)
    .get('/user', verifyJWT, UserController.userAll)
    .get('/user/:id', verifyJWT, UserController.userById);

module.exports = UserRouter;