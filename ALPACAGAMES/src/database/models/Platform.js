module.exports = (sequelize, DataTypes) => {
  let alias = 'Platform';
  let cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  };

  let config = {
    tableName: 'platforms',
    timestamps: false,
  };
  const Platform = sequelize.define(alias, cols, config);

  Platform.associate = function (models) {
    Platform.belongsToMany(models.VideoGame, {
      as: 'videoGamesPlatform',
      through: {
        model: 'video_game_platform',
        onDelete: 'CASCADE',
      },
      timestamps: false,
      foreignKey: 'platform_id',
      otherKey: 'video_game_id',
    });
  };

  return Platform;
};
