const express = require('express');
const UserController = require('../controllers/UserController');
const auth = require('../middlewares/auth');
const registerValidation = require('../middlewares/registerValidation');

const UserRouter = express.Router();

UserRouter
    .get('/user', auth, UserController.getAll)
    .post('/user', registerValidation, UserController.register)
    .get('/user/:id', auth, UserController.getById);

module.exports = UserRouter;