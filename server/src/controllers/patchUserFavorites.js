import models from '../db.js';
const { User } = models.models;

export default async function patchUserFavorites(request, response) {
  try {
    const { character } = request.body;
    const user = await User.findByPk(character.id);
    if (!user) {
      return response.status(404).json({ message: 'User not found' });
    }
    
    const updatedFavorites = [...user.favorites, id];
    
    await user.update({ favorites: updatedFavorites });
    
    response.status(201).json({ updatedFavorites, message: 'User favorites updated successfully' });
  } catch (error) {
    response.status(500).json({ error, message: 'Error updating user favorites' });
  }
}