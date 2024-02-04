import { DataTypes } from 'sequelize';

const getEpisodeModel = (sequelize) => {
  const Episode = sequelize.define('episode', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    air_date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    episodeCharacters: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      allowNull: false,
    }
  }, { timestamps: false });
  Episode.associate = (models) => {
    Episode.belongsToMany(models.Character, { through: 'Character_Episodes' });
  };
  return Episode;
};

export default getEpisodeModel;