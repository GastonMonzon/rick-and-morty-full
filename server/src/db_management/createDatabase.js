import { Sequelize } from 'sequelize';

const sequelAccess = new Sequelize(`postgres://postgres:123456@localhost:5432`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
async function checkDatabaseExists() {
  try {
    const query = `SELECT 1 FROM pg_database WHERE datname = 'rick_and_morty';`;
    const result = await sequelAccess.query(query, { raw: true });
    return result[0].length > 0;
  } catch (error) {
    console.error('Error checking database existence:', error);
    return false;
  }
}
export default async function createDatabaseIfNotExists() {
  try {
    const databaseExists = await checkDatabaseExists();
    if (databaseExists) {
      console.log('Database already exists.');
    } else {
      await sequelAccess.query(`CREATE DATABASE rick_and_morty;`);
      console.log('Database created successfully.');
    }
  } catch (error) {
    console.error('Error creating database:', error);
  }
}