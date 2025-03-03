/* eslint-disable no-undef */
const knex = require('knex')({
  client: 'mysql',
  connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
  },
  pool: { min: 0, max: 10 },
  seeds: {
      directory: './seeds',
  },
});

module.exports = knex;
