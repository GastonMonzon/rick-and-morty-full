import { Sequelize } from 'sequelize';

const sequelAccess = new Sequelize(`postgres://postgres:123456@localhost:5432`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

(async function deleteDatabase() {
  try {
    const query = `DROP DATABASE IF EXISTS rick_and_morty;`;
    await sequelAccess.query(query, { raw: true });
    console.log('Database "rick_and_morty" deleted.');
    return true;
  } catch (error) {
    console.error('Error deleting database rick_and_morty:', error);
    return false;
  }
})();