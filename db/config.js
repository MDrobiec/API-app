var mysql = require('mysql');


 var configDB = mysql.createPool({
  host: 'eu-cdbr-west-03.cleardb.net',
  user: 'ba4e95ea77fafc',
  password: '7e4d12d9',
  database: 'heroku_d221fcbbca3d81d',
  port: 3306
 });

 var getConnection = function(callback) {
  configDB.getConnection(function(err, connection) {
      callback(err, connection);
  });
};

 module.exports = {
  getConnection
 }
 