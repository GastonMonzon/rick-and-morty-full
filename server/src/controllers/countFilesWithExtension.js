import fs from 'fs';
import path from 'path';

export default async function countFilesWithExtension(request, response) {
  try {
    const { extension } = request.body;
    const folderPath = 'C:\\Users\\Gasto\\OneDrive\\Escritorio\\Curso Soy Henry\\rick_and_morty\\client\\src\\assets\\images';

    const files = fs.readdirSync(folderPath);
    const filteredFiles = files.filter(file => path.extname(file) === extension);
    response.status(200).json(filteredFiles.length);
  } catch (error) {
    console.error('Error reading folder:', error);
    response.status(404).send({ error, message: 'Error reading files in' });
  }
}