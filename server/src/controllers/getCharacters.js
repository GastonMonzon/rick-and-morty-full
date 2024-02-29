import models from '../db.js';
const { Character } = models.models;

export default async function getCharacters(request, response) {
  try {
    const characters = await Character.findAll();
    response.status(200).json(characters);
  } catch (error) {
    console.error(error);
    response.status(404).send({error, message: 'Error getting all characters'});
  }
}