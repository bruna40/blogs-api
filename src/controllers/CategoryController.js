const Category = require('../models/Category');

class CategoryController {
    static async create(req, res) {
        const { name } = req.body;
        const category = await Category.create({ name });
        if (!category) {
            return res.status(400).json({ message: '"name" is required' });
        }
        return res.status(201).json(category);
    }

    static async getAll(_req, res) {
        const categories = await Category.findAll();
        return res.status(200).json(categories);
    }
}

module.exports = CategoryController;