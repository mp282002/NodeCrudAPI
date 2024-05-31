const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost', // e.g., 'localhost'
  user: 'root',
  password: 'mpatil@28',
  database: 'collage',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool.promise();
