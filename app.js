const express = require("express");
const pool = require("./db");

const app = express();

app.use(express.json());

app.get("/car-sharing-app/users", async (request, response) => {
  try {
    const users = await pool.query("SELECT * FROM users");
    response.status(200).json(users.rows);
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal server error" });
  }
});

module.exports = app;
