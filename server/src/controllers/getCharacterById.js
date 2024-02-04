import models from '../db.js';
const { Character, Episode } = models.models;

export default async function getCharacterById(request, response) {
  try {
    const { id } = request.params;
    const character = await Character.findByPk(id, { include: Episode });
    response.status(200).json(character);
  } catch (error) {
    response.status(500).send({error, message: 'Error at getting character by id'});
  }
}