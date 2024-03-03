import auth from '../firebase.js';
import models from '../db.js';
const { User } = models.models;

export default async function patchFilterSettings(request, response) {
  try {
    const { isAscending, isAscendingF, orderBy, orderByF, selectedFilters, selectedFiltersF } = request.body;
    const user = auth.currentUser;
    if (user) {
      const uid = user.uid;
      const foundUser = await User.findOne({ where: { uid } });
      if (foundUser) {
        await foundUser.update({
          isAscending: isAscending,
          isAscendingF: isAscendingF,
          orderBy: orderBy,
          orderByF: orderByF,
          selectedFilters: selectedFilters,
          selectedFiltersF: selectedFiltersF
        });
        response.status(201).json({ message: 'Filter settings updated succesfully' });
      } else {
        response.status(404).json({ message: 'User not found in the database' });
      }
    } else {
      response.status(401).json({ message: 'No user is currently signed in' });
    }
  } catch (error) {
    console.error(error);
    response.status(500).send({ error, message: 'Error at updating filter settings in the database' });
  }
}