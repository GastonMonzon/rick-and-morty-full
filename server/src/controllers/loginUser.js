import models from '../db.js';
const { User } = models.models;
import { signInWithEmailAndPassword } from 'firebase/auth';
import auth from '../firebase.js';

export default async function loginUser(request, response) {
  try {
    const { email, password } = request.body;
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    const userOptions = await User.findOne({ where: { uid: user.uid } });
    if (userOptions) {
      response.status(200).json({ userOptions });
    } else {
      response.status(404).json({ message: 'User not found in the database' });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ error, message: 'Error logging in on firebase' });
  }
}