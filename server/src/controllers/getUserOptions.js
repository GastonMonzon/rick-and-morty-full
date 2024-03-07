import auth from '../firebase.js';
import models from '../db.js';
const { User } = models.models;

export default async function getUserOptions(request, response) {
  try {
    const user = auth.currentUser;
    if (user) {
      const userOptions = await User.findOne({ where: { uid: user.uid } });
      if (userOptions) {
        response.status(201).json(userOptions);
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