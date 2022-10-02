const PostCategory = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId:{
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'BlogPost',
        key: 'id',
      },
    },
    categoryId:{
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Categories',
        key: 'id',
      },
    }
  }, {
    tableName: 'post_categories',
    timestamps: false,
    underscored: true,
  });

  PostCategory.associate = (models) => {
    PostCategory.hasMany(models.BlogPost, {
      foreignKey: 'post_id',
    });
    PostCategory.hasMany(models.Categories, {
      foreignKey: 'category_id',
    });
  };

  return PostCategory;
}