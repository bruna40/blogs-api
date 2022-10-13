const { Category } = require('../models');

class CategoryService {
  static async checkCategories(categoryIds) {
    const categoriesExist = await Promise.all(
      categoryIds.map(async (categoryId) => {
        const categoryExist = await Category.findOne({ where: { id: categoryId } });
        return categoryExist;
      }),
    );

    if (categoriesExist.some((queryResult) => !queryResult)) {
      return ({ message: '"categoryIds" not found' });
    }

    return {};
  }
}

module.exports = CategoryService;