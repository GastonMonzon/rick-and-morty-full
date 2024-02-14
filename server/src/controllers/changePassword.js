import auth from '../firebase.js';
import { signOut } from 'firebase/auth';

export default async function changePassword(request, response) {
  try {
    const { email, currentPassword, newPassword } = request.body;
    const user = await auth().currentUser;
    const credential = await auth.EmailAuthProvider.credential(email, currentPassword);
    await user.reauthenticateWithCredential(credential);
    await user.updatePassword(newPassword);
    response.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    response.status(404).send({ error, message: 'Error loging out' });
  }
}