const PostCategory = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define(
    'PostCategory',
    {
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      timestamps: false,
      tableName: 'posts_categories',
      underscored: true,
    },
  );

  PostCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      through: PostCategory,
      foreignKey: 'category_id',
      otherKey: 'post_id',
      as: 'posts',
    });

    models.BlogPost.belongsToMany(models.Category, {
      through: PostCategory,
      foreignKey: 'post_id',
      otherKey: 'category_id',
      as: 'categories',
    });
  };

  return PostCategory;
};

module.exports = PostCategory;