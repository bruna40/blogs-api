const Category = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: DataTypes.STRING,
  }, {
    tableName: 'categories',
    timestamps: false,
  });

  Category.associate = (models) => {
    // Category.belongsTo(models.PostCategory, {
    //   foreignKey: 'category_id',
    // });
    Category.belongsToMany(models.PostCategory, {
      through: 'post_categories',
      as: 'post_id',
      foreignKey: 'category_id',
      });
  };

  return Category;
};

module.exports = Category;
