import createDatabaseIfNotExists from './createDatabase.js';
import { createTables } from './createTables.js';
import associateTables from './associateTables.js';

(async function main() {
  try {
    await createDatabaseIfNotExists();
    await createTables();
    await associateTables();
  } catch (error) {
    console.error('An error initializing the database:', error);
  }
})();