/* eslint-disable no-undef */
require("dotenv").config(); // Đảm bảo đọc biến môi trường từ .env
const knex = require("knex");

const dbConfig = {
  client: "mysql",
  connection: {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  },
  pool: { min: 0, max: 10 },
  seeds: {
    directory: "./seeds",
  },
};

// Cấu hình kết nối dựa trên môi trường
if (process.env.NODE_ENV === "production") {
  if (!process.env.INSTANCE_CONNECTION_NAME) {
    throw new Error(
      "Missing INSTANCE_CONNECTION_NAME in environment variables"
    );
  }
  dbConfig.connection.socketPath = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;
  console.log("Using socketPath:", dbConfig.connection.socketPath);
} else {
  dbConfig.connection.host = process.env.DB_HOST || "127.0.0.1";
  dbConfig.connection.port = process.env.DB_PORT || 3306;
  console.log(
    "Using host:",
    dbConfig.connection.host,
    "port:",
    dbConfig.connection.port
  );
}


const knexInstance = knex(dbConfig);

// Kiểm tra kết nối
knexInstance
  .raw("SELECT 1 + 1 AS result")
  .then(() => console.log("Knex connected to DB"))
  .catch((err) => console.error("Knex connection failed:", err.stack));

module.exports = knexInstance;
