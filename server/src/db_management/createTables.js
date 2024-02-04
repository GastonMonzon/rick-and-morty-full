import axios from 'axios';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import { SingleBar } from 'cli-progress';
import getCharacterModel from '../models/Character.js'
import getEpisodeModel from '../models/Episode.js';
import getUserModel from '../models/User.js';
dotenv.config();

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const progressBar = new SingleBar({}, {
  format: 'Progress [{bar}] {percentage}% | ETA: {eta}s | {value}/{total}',
  barCompleteChar: '\u2588',
  barIncompleteChar: '\u2591',
  hideCursor: true,
});

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@localhost:${DB_HOST}/rick_and_morty`, {
  logging: false,
  native: false,
});

export const models = {
  Character: getCharacterModel(sequelize, Sequelize),
  Episode: getEpisodeModel(sequelize, Sequelize),
  User: getUserModel(sequelize, Sequelize)
};

Object.keys(models).forEach((key) => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export async function createTables() {
  try {
    (async function testConnection() {
      try {
        await sequelize.authenticate();
        console.log('Connection established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
    })();
    await sequelize.sync();
    console.log('Tables created successfully.');
    const { Character, Episode } = models;
    const characterCount = await Character.count();
    const episodeCount = await Episode.count();
    if (characterCount === 0) {
      await populateCharacterTable(Character);
    }
    if (episodeCount === 0) {
      await populateEpisodeTable(Episode);
    } 
    if (characterCount !== 0 && episodeCount !== 0) {
      console.log('Tables are not empty. Skipping population.');
    }
  } catch (error) {
    console.error('Error creating tables:', error);
  }
}
async function populateCharacterTable(Character) {
  console.log('Creating characters');
  const allCharacters = await obtainAllCharacters();
  let count = 0;
  try {
    progressBar.start(allCharacters.length, count);
    for (const character of allCharacters) {
      const { id, name, status, species, type, gender, origin, location, image } = character;
      let originInfo = {};
      let locationInfo = {};
      if (origin.url === '' || !origin) {
        originInfo.name = 'Unknown';
        originInfo.type = 'Unknown';
        originInfo.dimension = 'Unknown';
      } else {
        originInfo = await fetchOriginData(origin.url);
      }
      if (location.url === '' || !location) {
        location.name = 'Unknown';
        location.type = 'Unknown';
        location.dimension = 'Unknown';
      } else {
        locationInfo = await fetchLocationData(location.url);
      }
      Character.create({
        id: id,
        name: name,
        status: status,
        species: species,
        type: type,
        gender: gender,
        image: image,
        origin_name: (originInfo && originInfo.name) ? originInfo.name : 'Unknown',
        origin_type: (originInfo && originInfo.type) ? originInfo.type : 'Unknown',
        origin_dimension: (originInfo && originInfo.dimension) ? originInfo.dimension : 'Unknown',
        location_name: (locationInfo && locationInfo.name) ? locationInfo.name : 'Unknown',
        location_type: (locationInfo && locationInfo.type) ? locationInfo.type : 'Unknown',
        location_dimension: (locationInfo && locationInfo.dimension) ? locationInfo.dimension : 'Unknown',
      });
      count++;
      progressBar.update(count);
    }
    progressBar.stop();
    console.log('Character table populated successfully');
  } catch (error) {
    console.error('Error populating character table:', error);
  }
}
export async function obtainAllCharacters() {
  let allCharacters = [];
  let nextPage = 'https://rickandmortyapi.com/api/character';
  while (nextPage) {
    try {
      const response = await axios(nextPage);
      const { results, info } = response.data;
      allCharacters = [...allCharacters, ...results];
      nextPage = info.next;
    } catch (error) {
      console.error('Error obtaining characters');
      break;
    }
  }
  return allCharacters;
}
async function populateEpisodeTable(Episode) {
  console.log('Creating episodes');
  const allEpisodes = await obtainAllEpisodes();
  let count = 0;
  progressBar.start(allEpisodes.length, count);
  try {
    for (const episode of allEpisodes) {
      const { id, name, air_date, characters } = episode;
      const episodeCharactersArray = [];
      for (const character of characters) {
        const { data } = await axios(character);
        const episodeCharacter = {};
        episodeCharacter.id = data.id;
        episodeCharacter.name = data.name;
        episodeCharacter.image = data.image;
        episodeCharactersArray.push(episodeCharacter);
      }
      Episode.create({
        id: id,
        name: name,
        code: episode.episode,
        air_date: air_date,
        episodeCharacters: episodeCharactersArray
      });
      count++;
      progressBar.update(count);
    }
    progressBar.stop();
    console.log('Episode table populated successfully');
  } catch (error) {
    console.error('Error populating episode table:', error);
  }
}
export async function obtainAllEpisodes() {
  let allEpisodes = [];
  let nextPage = 'https://rickandmortyapi.com/api/episode';
  while (nextPage) {
    try {
      const response = await axios(nextPage);
      const { results, info } = response.data;
      allEpisodes = [...allEpisodes, ...results];
      nextPage = info.next;
    } catch (error) {
      console.error('Error obtaining episodes');
      break;
    }
  }
  return allEpisodes;
}
async function fetchOriginData(direction) {
  try {
    const response = await axios(direction);
    return response.data;
  } catch (error) {
    console.log('Error fetching origin');
  }
}
async function fetchLocationData(direction) {
  try {
    const response = await axios(direction);
    return response.data;
  } catch (error) {
    console.log('Error fetching location');
  }
}