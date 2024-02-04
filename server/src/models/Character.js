import { DataTypes } from 'sequelize';

const getCharacterModel = (sequelize) => {
  const Character = sequelize.define('character', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    species: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true
    },
    origin_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    origin_type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    origin_dimension: {
      type: DataTypes.STRING,
      allowNull: true
    },
    location_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    location_type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    location_dimension: {
      type: DataTypes.STRING,
      allowNull: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, { timestamps: false });
  Character.associate = (models) => {
    Character.belongsToMany(models.Episode, { through: 'Character_Episodes' });
  };
  return Character;
};

export default getCharacterModel;