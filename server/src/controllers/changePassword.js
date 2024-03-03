import auth from '../firebase.js';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword  } from 'firebase/auth';

export default async function changePassword(request, response) {
  try {
    const { currentPassword, newPassword } = request.body;
    const user = auth.currentUser;
    if (!user) {
      return response.status(401).json({ message: 'No user is currently signed in.' });
    }
    const { email } = user;
    if (!email) {
      return response.status(400).json({ message: 'User email is not available.' });
    }
    const credential = EmailAuthProvider.credential(email, currentPassword);
    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, newPassword);
    response.status(200).json({ message: 'Password change successful' });
  } catch (error) {
    console.error(error);
    response.status(500).send({ error, message: 'Error changing password from firebase' });
  }
}