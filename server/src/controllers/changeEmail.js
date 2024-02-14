import auth from '../firebase.js';

export default async function changeEmail(request, response) {
  try {
    const { previousEmail, newEmail, password } = request.body;
    var user = await auth().currentUser;
    var credential = await auth.EmailAuthProvider.credential(previousEmail, password);
    await user.reauthenticateWithCredential(credential);
    await user.updateEmail(newEmail);
    response.status(200).json({ message: 'Email change successful' });
  } catch (error) {
    console.log(error);
    response.status(404).send({ error, message: 'Error changing email' });
  }
}