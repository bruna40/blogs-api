const express = require('express');
const UserController = require('../controllers/UserController');
const auth = require('../middlewares/auth');
const registerValidation = require('../middlewares/registerValidation');

const UserRouter = express.Router();

UserRouter
    .post('/user', registerValidation, UserController.register)
    .get('/user', auth, UserController.getAll)
    .get('/user/:id', auth, UserController.getById);

module.exports = UserRouter;