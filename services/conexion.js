const mysql      = require('mysql');
module.exports = () => {
  return mysql.createConnection({
    host     : 'localhost',
    user     : 'desarrollo',
    password : '123456789',
    database : 'databasejose'
  });
}
