import axios from 'axios';
import { models, obtainAllCharacters } from './createTables.js';
const { Character, Episode, Character_Episodes } = models;
import { SingleBar } from 'cli-progress';

const progressBar = new SingleBar({}, {
  format: 'Progress [{bar}] {percentage}% | ETA: {eta}s | {value}/{total}',
  barCompleteChar: '\u2588',
  barIncompleteChar: '\u2591',
  hideCursor: true,
});

export default async function associateTables() {
  try {
    console.log('Associating characters');
    const allCharacters = await obtainAllCharacters();
    const characterCheck = await Character.findByPk(allCharacters[0].id);
    const associatedEpisodes = await characterCheck.getEpisodes();
    if (associatedEpisodes.length > 0) {
      console.log('Character associations already made. Skipping associations.');
      return;
    }
    let count = 0;
    progressBar.start(allCharacters.length, count);
    for (const character of allCharacters) {
      for (const episode of character.episode) {
        const { data } = await axios(episode);
        const characterToAddTo = await Character.findByPk(character.id);
        const episodeToAddFor = await Episode.findByPk(data.id);
        if (characterToAddTo && episodeToAddFor) {
          await characterToAddTo.addEpisode(episodeToAddFor);
        }
      }
      count++;
      progressBar.update(count);
    }
    progressBar.stop();
    console.log('Character associations completed successfully');
  } catch (error) {
    console.error('Error associating episodes to characters:', error);
  }
}