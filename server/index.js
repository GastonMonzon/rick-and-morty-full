import server from './src/app.js';
import db from './src/db.js';
const { sequelize } = db;
const PORT = 3001;

sequelize.sync({ alter: true })
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    })
  })
  .catch(error => console.error(error));