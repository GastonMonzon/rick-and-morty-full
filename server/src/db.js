import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import getCharacterModel from './models/Character.js'
import getEpisodeModel from './models/Episode.js';
import getUserModel from './models/User.js';

dotenv.config();
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@localhost:${DB_HOST}/rick_and_morty`, {
  logging: false,
  native: false,
});

const models = {
  Character: getCharacterModel(sequelize, Sequelize),
  Episode: getEpisodeModel(sequelize, Sequelize),
  User: getUserModel(sequelize, Sequelize)
};

Object.keys(models).forEach((key) => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

(async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

export default {
  models,
  sequelize
}
