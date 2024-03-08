import auth from '../firebase.js';
import models from '../db.js';
const { User } = models.models;

export default async function patchSearchSettings(request, response) {
  try {
    const { searchQuery, searchQueryF, searchBy, searchByF } = request.body;
    const user = auth.currentUser;
    if (user) {
      const uid = user.uid;
      const foundUser = await User.findOne({ where: { uid } });
      if (foundUser) {
        await foundUser.update({
          searchQuery: searchQuery,
          searchQueryF: searchQueryF,
          searchBy: searchBy,
          searchByF: searchByF
        });
        response.status(201).json({ message: 'Search settings updated successfully' });
      } else {
        response.status(404).json({ message: 'User not found in the database' });
      }
    } else {
      response.status(401).json({ message: 'No user is currently signed in' });
    }
  } catch (error) {
    console.error(error);
    response.status(500).send({ error, message: 'Error updating search settings in the database' });
  }
}