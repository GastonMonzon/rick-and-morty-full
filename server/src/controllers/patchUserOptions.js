import models from '../db.js';
const { User } = models.models;

export default async function patchUserOptions(request, response) {
  try {
    const { id } = request.query;
    const { image, homeBackground, favoritesBackground, DetailBackground, loadingScreen, searchBy, orderBy, verticalCardsPerRow, horizontalCardsPerRow, infoLabels, infoPosition, textPositionX, textPositionY, searchByFavorites, orderByFavorites, verticalCardsPerRowFavorites, horizontalCardsPerRowFavorites, infoLabelsFavorites, infoPositionFavorites, textPositionXFavorites, textPositionYFavorites, favoritesIcon, episodeInfo, episodesView, episodeListView, charactersView } = request.body;
    
    response.status(201).json({updatedDog,  message: 'User options updated succesfully' });
  } catch (error) {
    response.status(404).send({ error, message: 'Error at updating user options'});
  }
}