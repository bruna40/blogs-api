const CategoryService = require('../services/CategoryService');
const UserService = require('../services/UserService');
const BlogPostService = require('../services/BlogPostService');
const PostCategoryService = require('../services/PostCategoryService');

class BlogPostController {
  static async getAll(_req, res) {
    const posts = await BlogPostService.findAll();
    return res.status(200).json(posts);
  }

  static async getById(req, res) {
    const { id } = req.params;

    const post = await BlogPostService.findOne(id);

    if (!post) return res.status(404).json({ message: 'Post does not exist' });

    return res.status(200).json(post);
  }

  static async search(req, res) {
    const { q } = req.query;

    if (!q) {
      const allPosts = await BlogPostService.findAll();
      return res.status(200).json(allPosts);
    }

    const post = await BlogPostService.findByQuery(q);

    if (!post) {
      return res.status(200).json([]);
    }

    return res.status(200).json(post);
  }

  static async register(req, res) {
    const { title, content, categoryIds } = req.body;
    const { authorization } = req.headers;

    if ([title, content, categoryIds].some((item) => !item) || !categoryIds.length) {
      return res.status(400).json({ message: 'Some required fields are missing' });
    }

    const { message } = await CategoryService.checkCategories(categoryIds);
    if (message) return res.status(400).json({ message });

    const userId = await UserService.findUser(authorization);
    const post = await BlogPostService.create({ title, content, userId });

    await Promise.all(categoryIds.map(async (categoryId) => {
      await PostCategoryService.createPost(post.id, categoryId);
    }));

    return res.status(201).json(post);
  }

  static async update(req, res) {
    const { id } = req.params;
    const { authorization } = req.headers;
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Some required fields are missing' });
    }

    const decodedId = await UserService.findUser(authorization);
    const post = await BlogPostService.findOne(id);

    if (!post) return res.status(404).json({ message: 'Post does not exist' });

    if (post.userId !== decodedId) {
      return res.status(401).json({ message: 'Unauthorized user' });
    }

    const updatedPost = await BlogPostService.update(id, title, content);

    return res.status(200).json(updatedPost);
  }

  static async delete(req, res) {
    const { id } = req.params;
    const { authorization } = req.headers;

    const decodedId = await UserService.findUser(authorization);
    const post = await BlogPostService.findOne(id);

    if (!post) return res.status(404).json({ message: 'Post does not exist' });

    if (post.userId !== decodedId) {
      return res.status(401).json({ message: 'Unauthorized user' });
    }

    await BlogPostService.delete(id);
    return res.sendStatus(204);
  }
}

module.exports = BlogPostController;