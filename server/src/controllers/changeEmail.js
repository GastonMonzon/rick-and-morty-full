import auth from '../firebase.js';

export default async function changeEmail(request, response) {
  try {
    const { newEmail, password } = request.body;
    const user = await auth().currentUser;
    if (!user) {
      return response.status(401).json({ message: 'No user is currently signed in.' });
    }
    const { email } = user;
    if (!email) {
      return response.status(400).json({ message: 'User email is not available.' });
    }
    const credential = await auth.EmailAuthProvider.credential(user.email, password);
    await user.reauthenticateWithCredential(credential);
    await user.updateEmail(newEmail);
    response.status(200).json({ message: 'Email change successful' });
  } catch (error) {
    console.error(error);
    response.status(404).send({ error, message: 'Error changing email' });
  }
}