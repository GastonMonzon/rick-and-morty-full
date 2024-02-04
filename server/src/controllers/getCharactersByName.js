import { Op } from 'sequelize';
import models from '../db.js';
const { Character } = models.models;

export default async function getCharactersByName(request, response) {
  try {
    const { name } = request.query;
    const searchedCharacters = await Character.findAll({
      where: {
        name: { [Op.iLike]: `%${name}%` } // Search for case-insensitive match
      }
    });
    response.status(200).json(searchedCharacters);
  } catch (error) {
    response.status(500).send('Error at searching characters by name');
  }
}