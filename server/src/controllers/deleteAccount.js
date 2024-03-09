import models from '../db.js';
const { User } = models.models;
import auth from '../firebase.js';
import { firestore } from '../firebase.js';
import { doc, getDoc } from 'firebase/firestore';

export default async function deleteAccount(request, response) {
  try {
    const user = auth.currentUser;
    if (user) {
      const userOptions = await User.findOne({ where: { uid: user.uid } });
      await user.delete();
      if (userOptions) {
        await userOptions.destroy();
      }
      const userDocRef = doc(firestore, 'users', user.uid);
      const snapshot = await getDoc(userDocRef);
      if (snapshot.exists()) {
        // await deleteDoc(userDocRef);
      }
      response.status(200).json({ message: 'Account deleted successfully' });
    } else {
      response.status(401).json({ message: 'No user is currently signed in.' });
    }
  } catch (error) {
    console.error(error);
    response.status(500).send({ error, message: 'Error deleting account from firebase' });
  }
}