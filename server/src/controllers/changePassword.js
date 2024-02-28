import auth from '../firebase.js';

export default async function changePassword(request, response) {
  try {
    const { currentPassword, newPassword } = request.body;
    const user = await auth().currentUser;
    if (!user) {
      return response.status(401).json({ message: 'No user is currently signed in.' });
    }
    const { email } = user;
    if (!email) {
      return response.status(400).json({ message: 'User email is not available.' });
    }
    const credential = await auth.EmailAuthProvider.credential(email, currentPassword);
    await user.reauthenticateWithCredential(credential);
    await user.updatePassword(newPassword);
    response.status(200).json({ message: 'Password change successful' });
  } catch (error) {
    response.status(500).send({ error, message: 'Error changing password' });
  }
}