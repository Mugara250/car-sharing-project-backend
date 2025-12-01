const express = require("express");
const bcrypt = require("bcrypt");
const pool = require("./db");

const app = express();

app.use(express.json());
// app.use((request, response, next) => {
//   if (
//     !Object.keys(request.body).includes("name") ||
//     !Object.keys(request.body).includes("password") ||
//     !Object.keys(request.body).includes("phoneNumber")
//   ) {
//     response
//       .status(400)
//       .json({ message: "Malformed request! Missing information..." });
//     return;
//   }
//   next();
// });

// app.use(async (request, response, next) => {
//   try {
//     const { rows: users } = await pool.query("SELECT * FROM users");
//     if (!users.find((user) => user.id === request.params.id)) {
//       response.status(404).json({ message: "Invalid ID!" });
//     }
//   } catch (error) {
//     console.log(error);
//     response.status(500).json({ message: "Internal server error!" });
//   }
// });
app.get("/car-sharing-app/users", async (request, response) => {
  try {
    const { rows: users } = await pool.query("SELECT * FROM users");
    response.status(200).json(
      users.map((user) => {
        delete user.password;
        return user;
      })
    );
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal server error" });
  }
});

app.post("/car-sharing-app/users", async (request, response) => {
  try {
    if (
      !Object.keys(request.body).includes("name") ||
      !Object.keys(request.body).includes("password") ||
      !Object.keys(request.body).includes("phoneNumber")
    ) {
      response
        .status(400)
        .json({ message: "Malformed request! Missing information..." });
      return;
    }
    const hashedPassword = await bcrypt.hash(request.body.password, 10);
    const query =
      "INSERT INTO users(name, password, phone_number) VALUES ($1, $2, $3) RETURNING *";
    const values = [
      request.body.name,
      hashedPassword,
      request.body.phoneNumber,
    ];
    const { rows } = await pool.query(query, values);
    response.status(200).json(
      rows.map((row) => {
        delete row.password;
        return row;
      })
    );
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal server error" });
  }
});

app.delete("/car-sharing-app/users/:id", async (request, response) => {
  try {
    const { rows: users } = await pool.query("SELECT * FROM users");
    if (!users.find((user) => user["user_id"] === request.params.id)) {
      return response.status(404).json({ message: "Invalid ID!" });
    }
    await pool.query(`DELETE FROM users WHERE user_id=${+request.params.id}`);
    response.status(204).json({ message: "success" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal server error!" });
  }
});
module.exports = app;
