import auth from '../firebase.js';
import { EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';

export default async function getPasswordAuth(request, response) {
  try {
    const { password } = request.body;
    const user = auth.currentUser;
    if (!user) {
      return response.status(401).json({ message: 'No user is currently signed in.' });
    }
    const { email } = user;
    if (!email) {
      return response.status(400).json({ message: 'User email is not available.' });
    }
    const credential = EmailAuthProvider.credential(email, password);
    await reauthenticateWithCredential(auth.currentUser, credential);
    response.status(204).send(); // No content response
  } catch (error) {
    console.error(error);
    response.status(500).send({ error, message: 'Error reauthenticating user on firebase' });
  }
}