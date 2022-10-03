const BlogPost = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {

    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: {
      type: DataTypes.STRING
    },
    content: {
      type: DataTypes.STRING
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id',
      },
    },
    published: {
      type: DataTypes.DATE
    },
    updated: {
      type: DataTypes.DATE
    }}, {
      tableName: 'blog_posts',
      timestamps: false,
      underscored: true,
   },
  );

    BlogPost.associate = (models) => {
      // BlogPost.belongsTo(models.User, { foreignKey: 'user_id' });
      // BlogPost.belongsToMany(models.PostCategory, {
      //   through: 'post_categories',
      //   as: 'post_id',
      //   foreignKey: 'post_id',
      //   });
      BlogPost.belongsToMany(models.User, { foreignKey: 'user_id' });
      BlogPost.belongsToMany(models.PostCategory, { foreignKey: 'post_id' });
      BlogPost.hasMany(models.Category, { foreignKey: 'post_id' });
    };
    return BlogPost;
  }

  module.exports = BlogPost;