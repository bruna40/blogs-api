'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('posts_categories', {
      postId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        field: 'post_id',
        allowNull: false,
        references: {
          model: 'blog_posts',
          key: 'id',
        },

    },
    categoryId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      field: 'category_id',
      allowNull: false,
      references: {
        model: 'categories',
        key: 'id',
      },
    },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('posts_categories');
  }
};