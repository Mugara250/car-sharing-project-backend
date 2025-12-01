require("dotenv").config();
const { Pool, Client } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

module.exports = pool;

// const client = new Client({
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   port: process.env.DB_PORT,
// });

// client.connect((err) => {
//   if (err) {
//     return console.error("Connection error", err.stack);
//   }
//   console.log(`Successfully connected to ${process.env.DB_NAME}`);
// });

// client.query("SELECT * FROM users", (err, result) => {
//   if (err) {
//     return console.error("Invalid query", err.stack);
//   }
//   console.log(result.rows);
//   client.end(() => {
//     console.log(`Successfully ended the connection to ${process.env.DB_NAME}`);
//   });
// });
