const { Router } = require('express');
const auth = require('../middlewares/auth');
const BlogPostController = require('../controllers/BlogPostController');

const BlogPostRouter = Router();

BlogPostRouter
    .get('/post', auth, BlogPostController.getAll)
    .get('/post/search', auth, BlogPostController.search)
    .get('/post/:id', auth, BlogPostController.getById)
    .post('/post', auth, BlogPostController.register)
    .put('/post/:id', auth, BlogPostController.update)
    .delete('/post/:id', auth, BlogPostController.delete);

module.exports = BlogPostRouter;