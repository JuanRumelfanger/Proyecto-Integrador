module.exports = (sequelize, DataTypes) => {
  let alias = 'VideoGame';
  let cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
    },
    name: {
      type: DataTypes.STRING(255),
    },
    release_date: {
      type: DataTypes.DATE,
    },
  };
  let config = {
    tableName: 'video_game',
    timestamps: true,
    underscored: true,
  };
  const VideoGame = sequelize.define(alias, cols, config);

  VideoGame.associate = function (models) {
    VideoGame.belongsToMany(models.Genre, {
      as: 'genres',
      through: {
        model: 'genre_list',
        onDelete: 'CASCADE',
      },
      timestamps: false,
      foreignKey: 'video_game_id',
      otherKey: 'genre_id',
    });

    VideoGame.belongsToMany(models.Platform, {
      as: 'platforms',
      through: {
        model: 'video_game_platform',
        onDelete: 'CASCADE',
      },
      foreignKey: 'video_game_id',
      otherKey: 'platform_id',
    });

    VideoGame.belongsToMany(models.User, {
      as: 'users',
      through: {
        model: 'user_video_game',
        onDelete: 'CASCADE',
      },
      foreignKey: 'video_game_id',
      otherKey: 'user_id',
    });

    VideoGame.hasOne(models.VideoGameDetail, {
      as: 'details',
      foreignKey: 'video_game_id',
      onDelete: 'CASCADE',
    });
  };

  return VideoGame;
};
