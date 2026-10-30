const { Pool } = require("pg");

module.exports = new Pool({
  host: "localhost",
  user: "postgres",
  password: process.env.DB_PASSWORD,
  database: "authentication",
  port: 5432,
});