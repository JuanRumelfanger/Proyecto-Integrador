module.exports = (sequelize, DataTypes) => {
  let alias = 'VideoGameDetail';
  let cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    images: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    requiments: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  };
  let config = {
    tableName: 'video_game_details',
    timestamps: false,
    underscored: true,
  };

  const VideoGameDetail = sequelize.define(alias, cols, config);

  VideoGameDetail.associate = function (models) {
    VideoGameDetail.belongsTo(models.VideoGame, {
      as: 'videoGame',
      foreignKey: 'video_game_id',
      onDelete: 'CASCADE',
    });
  };

  return VideoGameDetail;
};
