import models from '../db.js';
const { Character } = models.models;

export default async function getCharacterByRandomId(request, response) {
  try {
    const characters = await Character.findAll();
    const randomNumber = Math.floor(Math.random() * characters.length) + 1;
    const randomCharacter = characters[randomNumber];
    response.status(200).json(randomCharacter);
  } catch (error) {
    console.error(error);
    response.status(500).send({ error, message: 'Error at searching character by random id'});
  }
}