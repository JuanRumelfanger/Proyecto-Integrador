module.exports = (sequelize, DataTypes) => {
  let alias = 'Role';
  let cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  };

  let config = {
    tableName: 'roles',
    timestamps: false,
  };
  const Role = sequelize.define(alias, cols, config);

  Role.associate = function (models) {
    Role.belongsToMany(models.User, {
      as: 'user_rol',
      through: {
        model: 'user_roles',
        onDelete: 'CASCADE',
      },
      foreignKey: 'role_id',
      otherKey: 'user_id',
    });
  };

  return Role;
};
