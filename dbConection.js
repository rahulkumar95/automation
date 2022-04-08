const mysql = require('mysql');
const debug = require('debug')('automation:DBConnection');

debug('Trying to connect DB');
const connection = mysql.createConnection({
  host: global.gConfig.database.host,
  port: global.gConfig.database.port,
  database: global.gConfig.database.name,
  user: global.gConfig.database.user,
  password: global.gConfig.database.password,
});

connection.connect((err) => {
  if (err) {
    debug('Error in connecting DB ', err);
    throw err;
  }
  debug('Successfully connected to DB');
});
module.exports = connection;
