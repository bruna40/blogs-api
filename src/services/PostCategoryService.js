const { PostCategory } = require('../models');

class PostCategoryService {
  static async createPost(postId, categoryId) {
    await PostCategory.create({ postId, categoryId });
  }
}

module.exports = PostCategoryService;