import fs from 'fs';
import path from 'path';

export default function countFilesWithExtension(folderPath, extension) {
  try {
    const files = fs.readdirSync(folderPath);
    const filteredFiles = files.filter(file => path.extname(file) === extension);
    return filteredFiles.length;
  } catch (error) {
    console.error('Error reading folder:', error);
    return 0;
  }
}