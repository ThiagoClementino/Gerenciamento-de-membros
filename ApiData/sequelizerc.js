// .sequelizerc

const path = require('path');

module.exports = {
  config: path.resolve('db','config', 'database.js'),
  'models-path': path.resolve('db', 'models'),
  'seeders-path': path.resolve('db', 'seeders'),
  'migrations-path': path.resolve('db', 'migrations'),
};