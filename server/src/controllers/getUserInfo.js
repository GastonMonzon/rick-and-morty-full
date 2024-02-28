import auth from '../firebase.js';
import { firestore } from '../firebase.js';
import { doc, getDoc } from 'firebase/firestore';

export default async function getUserInfo(request, response) {
  try {
    const user = auth.currentUser;
    if (user) {
      const uid = user.uid;
      const userDocRef = doc(firestore, 'users', uid);
      const snapshot = await getDoc(userDocRef);

      if (snapshot.exists()) {
        const userData = snapshot.data();
        console.log('User data:', userData);
        response.status(200).json(userData);
      } else {
        response.status(404).json({ message: 'User data not found.' });
      }
    } else {
      response.status(401).json({ message: 'No user is currently signed in.' });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ error, message: 'Error getting user data' });
  }
}