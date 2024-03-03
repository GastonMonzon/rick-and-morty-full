import auth from '../firebase.js';
import { firestore } from '../firebase.js';
import { doc, updateDoc } from 'firebase/firestore';

export default async function patchUserData(request, response) {
  try {
    const { name, surName, userName, dateOfBirth } = request.body;
    const user = auth.currentUser;
    if (user) {
      const uid = user.uid;
      const userDocRef = doc(firestore, 'users', uid);
      const userData = {};
      if (name !== undefined && name !== '') {
        userData.name = name;
      }
      if (surName !== undefined && surName !== '') {
        userData.surName = surName;
      }
      if (userName !== undefined && userName !== '') {
        userData.userName = userName;
      }
      if (dateOfBirth !== undefined && dateOfBirth !== '') {
        userData.dateOfBirth = dateOfBirth;
      }
      await updateDoc(userDocRef, userData);
      response.status(200).json({ message: 'User data updated succesfully' });
    } else {
      response.status(401).json({ message: 'No user is currently signed in' });
    }
  } catch (error) {
    console.error(error);
    response.status(500).send({ error, message: 'Error updating user data in firestore'});
  }
}