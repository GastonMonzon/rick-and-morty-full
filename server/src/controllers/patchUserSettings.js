import auth from '../firebase.js';
import models from '../db.js';
const { User } = models.models;

export default async function patchUserSettings(request, response) {
  try {
    const { autoSaveSearch, autoSaveFilters, autoSaveOptions, favorites, homeBackground, favoritesBackground, detailBackground, loadingScreen } = request.body;
    const user = auth.currentUser;
    if (user) {
      const uid = user.uid;
      const foundUser = await User.findOne({ where: { uid } });
      if (foundUser) {
        await foundUser.update({
          autoSaveSearch: autoSaveSearch,
          autoSaveFilters: autoSaveFilters,
          autoSaveOptions: autoSaveOptions,
          favorites: favorites,
          homeBackground: homeBackground,
          favoritesBackground: favoritesBackground,
          detailBackground: detailBackground,
          loadingScreen: loadingScreen
        });
        response.status(201).json({ message: 'User settings updated successfully' });
      } else {
        response.status(404).json({ message: 'User not found in the database' });
      }
    } else {
      response.status(401).json({ message: 'No user is currently signed in' });
    }
  } catch (error) {
    console.error(error);
    response.status(500).send({ error, message: 'Error updating user settings' });
  }
}