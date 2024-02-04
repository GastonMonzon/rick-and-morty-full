import models from '../db.js';
const { User } = models.models;

export default async function getUserInfo(request, response) {
  try {
    const userInfo = await User.findAll();
    response.status(200).json(userInfo);
  } catch (error) {
    response.status(404).send({error, message: 'Error at getting user information'});
  }
}