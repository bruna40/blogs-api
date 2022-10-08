const express = require('express');
const Category = require('../controllers/CategoryController');
const auth = require('../middlewares/auth');

const CategoryRouter = express.Router();

CategoryRouter
    .post('/categories', auth, Category.register)
    .get('/categories', auth, Category.getAll);

module.exports = CategoryRouter;