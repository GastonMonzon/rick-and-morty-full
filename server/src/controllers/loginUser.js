import models from '../db.js';
const { User } = models.models;
import { signInWithEmailAndPassword } from 'firebase/auth';
import auth from '../firebase.js';

export default async function loginUser(request, response) {
  try {
    const { email, password } = request.body;
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    const loginUser = await User.findOne({ where: { uid: user.uid } });
    console.log(loginUser);
    response.status(200).json(loginUser);
  } catch (error) {
    console.log(error);
    response.status(404).send({ error, message: 'Error loging in' });
  }
}