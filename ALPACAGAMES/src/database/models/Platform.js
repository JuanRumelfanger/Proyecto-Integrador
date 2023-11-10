module.exports = (sequelize, DataTypes) => {
  let alias = 'Platform'
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
    url_logo: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  }

  let config = {
    tableName: 'Platform',
    timestamps: false,
  }
  const Platform = sequelize.define(alias, cols, config)

  Platform.associate = function (models) {
    Platform.belongsToMany(models.VideoGame, {
      as: 'videoGamesPlatform',
      through: 'video_game_platform',
      foreignKey: 'platform_id',
      otherKey: 'video_game_id',
    })
  }

  return Platform
}
