import models from '../db.js';
const { Episode } = models.models;

export default async function getEpisodes(request, response) {
    try {
        const episodes = await Episode.findAll();
        response.status(200).json(episodes);
    } catch (error) {
        response.status(404).send({error, message: 'Error getting all episodes'});
    }
}