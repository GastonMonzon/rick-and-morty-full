import auth from '../firebase.js';
import { onAuthStateChanged } from 'firebase/auth';

export default async function getUserChange(request, response) {
  try {
    const unsubscribe = onAuthStateChanged(auth, user => {
      return user;
    })
    response.status(200).json(unsubscribe);
  } catch (error) {
    console.error(error);
    response.status(404).send({ error, message: 'Error loging in' });
  }
}