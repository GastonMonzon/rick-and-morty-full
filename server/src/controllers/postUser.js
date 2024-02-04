import models from '../db.js';
const { User } = models.models;
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import auth from '../firebase.js';

export default async function postUser(request, response) {
  try {
    const { name, surName, userName, dateOfBirth, email, password } = request.body;
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    const { uid } = user;
    const newUser = await User.create({ uid, name, surName, userName, dateOfBirth, email });
    console.log(newUser);
    response.status(201).json(newUser);
  } catch (error) {
    response.status(500).send({ error, message: 'Error registering new user' });
  }
}