const { Router } = require('express');
const UserController = require('../controllers/UserController');
const auth = require('../middlewares/auth');
const registerValidation = require('../middlewares/registerValidation');

const UserRouter = Router();

UserRouter
    .get('/user', auth, UserController.getAll)
    .get('/user/:id', auth, UserController.getById)
    .post('/user', registerValidation, UserController.register)
    .delete('/user/me', auth, UserController.delete);

module.exports = UserRouter;