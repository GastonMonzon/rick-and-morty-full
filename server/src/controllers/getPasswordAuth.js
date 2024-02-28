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
    const credential = EmailAuthProvider.credential(user.email, password);
    const result = await reauthenticateWithCredential(auth.currentUser, credential)
    response.status(200).send(result);
  } catch (error) {
    console.error(error);
    response.status(404).send(error);
  }
}