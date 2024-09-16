const { Pool } = require('pg');

require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

const initDb = async () => {
  try {
    await pool.connect();
    console.log('Connected to Postgres database');
  } catch (error) {
    console.error('Database connection error', error);
  }
};

module.exports = { pool, initDb };
