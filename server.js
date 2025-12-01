const app = require("./app");
const pool = require("./db");

const PORT = 4040;
(async () => {
  try {
    const client = await pool.connect();
    console.log(`Successfully connected to ${process.env.DB_NAME}...`);
    client.release();
    app.listen(PORT, "127.0.0.1", () => {
      console.log(`Server started running on port ${PORT}...`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
