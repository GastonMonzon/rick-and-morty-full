import auth from '../firebase.js';
import { signOut } from 'firebase/auth';

export default async function logoutUser(request, response) {
  try {
    await signOut(auth);
    response.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error, message: 'Error logging out' });
  }
}