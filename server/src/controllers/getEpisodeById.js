import models from '../db.js';
const { Character, Episode } = models.models;

export default async function getEpisodeById(request, response) {
  try {
    const { id } = request.params;
    const character = await Episode.findByPk(id, { include: Character });
    response.status(200).json(character);
  } catch (error) {
    console.error(error);
    response.status(500).send({error, message: 'Error at getting episode by id'});
  }
}