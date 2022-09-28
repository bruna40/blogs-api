'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class blog_posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      blog_posts.hasMany(models.users, {
        foreignKey: 'user_id',
      });
      blog_posts.belongsTo(models.posts_categories, {
        foreignKey: 'post_id',
      });
    }
  };
  blog_posts.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
    user_id: DataTypes.INTEGER,
    post_id: DataTypes.INTEGER,

  }, {
    sequelize,
    modelName: 'blog_posts',
  });
  return blog_posts;
};