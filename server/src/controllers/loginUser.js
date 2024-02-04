import models from '../db.js';
const { User } = models.models;
import { signInWithEmailAndPassword } from 'firebase/auth';
import auth from '../firebase.js';

export default async function loginUser(request, response) {
  try {
    const { email, password } = request.body;
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    const userOptions = await User.findOne({ where: { uid: user.uid } });
    response.status(200).json({ user, userOptions });
  } catch (error) {
    console.log(error);
    response.status(404).send({ error, message: 'Error loging in' });
  }
}