import fs from 'fs';
import path from 'path';

export default async function getNumberOfFilesOfExtension(request, response) {
  try {
    const { type, extension } = request.body;
    let folderPath;
    switch (type) {
      case 'images':
        folderPath = 'C:\\Users\\Gasto\\OneDrive\\Escritorio\\Curso Soy Henry\\rick_and_morty\\client\\src\\assets\\images';
        break;
      case 'videos':
        folderPath = 'C:\\Users\\Gasto\\OneDrive\\Escritorio\\Curso Soy Henry\\rick_and_morty\\client\\src\\assets\\backgroundVideos';
        break;
      case 'gifs':
        folderPath = 'C:\\Users\\Gasto\\OneDrive\\Escritorio\\Curso Soy Henry\\rick_and_morty\\client\\src\\assets\\loadingGifs';
        break;
      default:
        break;
    }

    const files = fs.readdirSync(folderPath);
    const filteredFiles = files.filter(file => path.extname(file) === extension);
    response.status(200).json(filteredFiles.length);
  } catch (error) {
    console.error('Error reading folder:', error);
    response.status(404).send({ error, message: 'Error reading files' });
  }
}