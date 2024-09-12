module.exports = (sequelize, DataTypes) => {
  let alias = 'User';
  let cols = {
    id: {
      type: DataTypes.BIGINT(10).UNSIGNED,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    // created_at:dataTypes.TIMESTAMP,
    // updated_at: dataTypes.TIMESTAMP,
    first_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    display_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    date_of_birth: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    registration_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
  };

  let config = {
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: false,
  };

  const User = sequelize.define(alias, cols, config);

  User.associate = function (models) {
    User.hasMany(models.Role, {
      as: 'roles',
      foreignKey: 'user_id',
    });

    User.belongsToMany(models.VideoGame, {
      as: 'videoGames',
      through: {
        model: 'users_game',
        onDelete: 'CASCADE',
      },
      foreignKey: 'user_id',
      otherKey: 'video_game_id',
    });
  };

  return User;
};
