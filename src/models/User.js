const User = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    displayName: {
      type: DataTypes.STRING,
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    tableName: 'users',
    timestamps: false,
    underscored: true,
   });

  User.associate = (models) => {
    User.hasMany(models.BlogPost, { foreignKey: 'user_id' });
  };

  return User;
}

module.exports = User;