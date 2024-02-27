import auth from '../firebase.js';

export default async function getUserData(request, response) {
  try {
    const user = auth().currentUser;
    if (user) {
      const uid = user.uid;
      const database = firebase.database();
      const userRef = database.ref('users/' + uid);
      const snapshot = await userRef.once('value');
      const userData = snapshot.val();
      console.log('User data:', userData);
      response.status(200).json(userData);
    } else {
      response.status(401).json({ message: 'No user is currently signed in.' });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ error, message: 'Error getting user data' });
  }
}