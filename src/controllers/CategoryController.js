const { Category } = require('../models');

class CategoryController {
  static async getAll(_req, res) {
    const categories = await Category.findAll();

    return res.status(200).json(categories);
  }

  static async register(req, res) {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: '"name" is required' });
    }

    const { id } = await Category.create({ name });

    return res.status(201).json({ id, name });
  }
}

module.exports = CategoryController;