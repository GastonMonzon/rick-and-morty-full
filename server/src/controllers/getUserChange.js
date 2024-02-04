import models from '../db.js';
const { User } = models.models;
import { onAuthStateChanged } from 'firebase/auth';
import auth from '../firebase.js';

export default async function getUserChange(request, response) {
  try {
    const unsubscribe = auth.onAuthStateChanged(user => {
      return user;
    })
    response.status(200).json(unsubscribe);
  } catch (error) {
    console.log(error);
    response.status(404).send({ error, message: 'Error loging in' });
  }
}