import models from '../db.js';
const { User } = models.models;
import auth from '../firebase.js';

export default async function getCurrentUser(request, response) {
  try {
    const user = auth.currentUser;
    if (user) {
      const userOptions = await User.findOne({ where: { uid: user.uid } });
      response.status(200).json(userOptions);
    } else {
      response.status(401).json({ message: 'No user is currently signed in.' });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ error, message: 'Error getting current user' });
  }
}