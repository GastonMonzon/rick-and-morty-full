

export default async function patchUserData(request, response) {
  try {
    const { name, surName, userName, dateOfBirth } = request.body;
    const user = auth().currentUser;
    if (!user) {
      return response.status(401).json({ message: 'No user is currently signed in.' });
    }
    const uid = user.uid;
    const database = firebase.database();
    const userRef = database.ref('users/' + uid);
    const userData = {};
    if (name !== '') {
      userData.name = name;
    }
    if (surName !== '') {
      userData.surName = surName;
    }
    if (userName !== '') {
      userData.userName = userName;
    }
    if (dateOfBirth !== '') {
      const timestamp = dateOfBirth.getTime();
      userData.dateOfBirth = timestamp;
    }
    await userRef.update(userData);
    response.status(200).json({ message: 'User data updated succesfully' });
  } catch (error) {
    console.error(error);
    response.status(500).send({ error, message: 'Error at updating user data' });
  }
}