const Sequelize = require('sequelize');
const db = new Sequelize('geeky_devs', 'root', 'passioniskey', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.error(err));

module.exports = db;
