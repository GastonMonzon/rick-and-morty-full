import models from '../db.js';
const { User } = models.models;
import auth from '../firebase.js';

export default async function deleteAccount(request, response) {
  try {
    const user = auth.currentUser;
    if (!user) {
      return response.status(401).json({ message: 'No user is currently signed in.' });
    }
    const userOptions = await User.findOne({ where: { uid: user.uid } });
    await user.delete();
    if (userOptions) {
      await userOptions.destroy();
    }
    response.status(200).json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error(error);
    response.status(500).send({ error, message: 'Error deleting account' });
  }
}