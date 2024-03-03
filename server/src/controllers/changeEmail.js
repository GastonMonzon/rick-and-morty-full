import auth from '../firebase.js';
import { EmailAuthProvider, reauthenticateWithCredential, updateEmail } from 'firebase/auth';

export default async function changeEmail(request, response) {
  try {
    const { newEmail, password } = request.body;
    const user = auth.currentUser;
    if (!user) {
      return response.status(401).json({ message: 'No user is currently signed in.' });
    }
    const { email } = user;
    if (!email) {
      return response.status(400).json({ message: 'User email is not available.' });
    }
    const credential = EmailAuthProvider.credential(email, password);
    await reauthenticateWithCredential(user, credential);
    await updateEmail(user, newEmail);
    response.status(200).json({ message: 'Email change successful' });
  } catch (error) {
    console.error(error);
    response.status(500).send({ error, message: 'Error changing email from firebase' });
  }
}