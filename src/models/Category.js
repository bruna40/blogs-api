const Categories = (sequelize, DataTypes) => {
  const Categories = sequelize.define('Category', {
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

  Categories.associate = (models) => {
    Categories.belongsTo(models.PostCategory, {
      foreignKey: 'category_id',
    });
  };

  return Category;
};
