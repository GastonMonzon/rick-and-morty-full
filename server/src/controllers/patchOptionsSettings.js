import auth from '../firebase.js';
import models from '../db.js';

const { User } = models.models;

export default async function patchOptionsSettings(request, response) {
  try {
    const { isFavoritesTogether, selectedCardsPerPage, selectedCardsPerPageF, verticalCardsPerRow, verticalCardsPerRowF, horizontalCardsPerRow, horizontalCardsPerRowF, infoLabels, infoLabelsF, infoPosition, infoPositionF, textPositionX, textPositionXF, textPositionY, textPositionYF, favoritesIcon, episodeInfo, episodesView, episodeListView, charactersView } = request.body;
    const user = auth.currentUser;
    if (user) {
      const uid = user.uid;
      const foundUser = await User.findOne({ where: { uid } });
      if (foundUser) {
        await foundUser.update({
          isFavoritesTogether: isFavoritesTogether,
          selectedCardsPerPage: selectedCardsPerPage,
          selectedCardsPerPageF: selectedCardsPerPageF,
          verticalCardsPerRow: verticalCardsPerRow,
          verticalCardsPerRowF: verticalCardsPerRowF,
          horizontalCardsPerRow: horizontalCardsPerRow,
          horizontalCardsPerRowF: horizontalCardsPerRowF,
          infoLabels: infoLabels,
          infoLabelsF: infoLabelsF,
          infoPosition: infoPosition,
          infoPositionF: infoPositionF,
          textPositionX: textPositionX,
          textPositionXF: textPositionXF,
          textPositionY: textPositionY,
          textPositionYF: textPositionYF,
          favoritesIcon: favoritesIcon,
          episodeInfo: episodeInfo,
          episodesView: episodesView,
          episodeListView: episodeListView,
          charactersView: charactersView
        });
        response.status(201).json({ message: 'Options settings updated successfully' });
      } else {
        response.status(404).json({ message: 'User not found in the database' });
      }
    } else {
      response.status(401).json({ message: 'No user is currently signed in' });
    }
  } catch (error) {
    console.error(error);
    response.status(500).send({ error, message: 'Error updating options settings in the database' });
  }
}