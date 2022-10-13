const { Router } = require('express');
const auth = require('../middlewares/auth');
const CategoryController = require('../controllers/CategoryController');

const CategoryRouter = Router();

CategoryRouter
    .get('/categories', auth, CategoryController.getAll)
    .post('/categories', auth, CategoryController.register);
module.exports = CategoryRouter;