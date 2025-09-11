//this file is sets up the pool object that allows us to connect to Postgres
//Pool = reuse connections instead of turning connections on and off one by one
import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config(); //load .env file into memory (we will read DB_* values from here)

//we create a connection pool with values in .env
//we never hardcore this information (security - flexibility)
export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

//note: we will be sending queries to DB everywhere by importing "pool" from this file
