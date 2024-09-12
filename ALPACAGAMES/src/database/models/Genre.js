module.exports = (sequelize, DataTypes) => {
  let alias = 'Genre';
  let cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
    },
  };

  let config = {
    tableName: 'genre',
    timestamps: false,
  };
  const Genre = sequelize.define(alias, cols, config);

  Genre.associate = function (models) {
    Genre.belongsToMany(models.VideoGame, {
      as: 'videoGamesGenre',
      through: {
        model: 'genre_list',
        onDelete: 'CASCADE',
      },
      timestamps: false,
      foreignKey: 'genre_id',
      otherKey: 'video_game_id',
    });
  };

  return Genre;
};
