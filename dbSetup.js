require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_host,
  user: process.env.DB_USER,
  password: process.env.DB_password,
  database: process.env.DB_name,
  port: process.env.DB_PORT,
});

connection.connect(function (err) {
  if (err) throw err;
  console.log('¡Nos conectamos a la BD!');
});

function customQuery(sql, callback) {
  connection.query(sql, callback);
  return connection;
}

module.exports = customQuery;

// handleSeeder: async (req, res) => {
//   await require('./seeders/userSeeder')();
//   console.log('ok');
// },
