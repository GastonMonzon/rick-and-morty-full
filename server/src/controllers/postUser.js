import models from '../db.js';
const { User } = models.models;
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import auth from '../firebase.js';

export default async function postUser(request, response) {
  try {
    const { name, surName, userName, dateOfBirth, email, password } = request.body;
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    const { uid } = user;
    const firestore = getFirestore();
    const userDoc = doc(firestore, 'users', uid);
    const userData = {
      name: name,
      surName: surName,
      userName: userName,
      dateOfBirth: dateOfBirth
    };
    await setDoc(userDoc, userData);
    await User.create({ uid });
    response.status(201).json({ message: 'New user created successfully' });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error, message: 'Error registering user on firebase' });
  }
}