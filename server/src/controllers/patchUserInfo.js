import models from '../db.js';
const { User } = models.models;

export default async function patchUserInfo(request, response) {
  try {
    const { id } = request.query;
    const { name, surName, userName, dateOfBirth, email, password } = request.body;
    
    response.status(201).json({updatedDog,  message: 'User info updated succesfully' });
  } catch (error) {
    response.status(404).send({ error, message: 'Error at updating user info'});
  }
}