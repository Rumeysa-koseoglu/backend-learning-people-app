// Controller = Layer of "work logic" + "connection with DB"
// Route knows "which address", and Controller knows "what we going to do"
import { pool } from "./db/pool.js";

//GET /users -> get all users
// this function is async because it requires a round trip to the DB
export const getAllUsers = async (req, res, next) => {
  try {
    //our SQL require: get all rows in the user table sorted by id
    const result = await pool.query("SELECT * FROM users ORDER BY id ASC");

    //result.rows is an array; we return the lines as json
    // The browser/client can parse this directly and list it on the screen
    res.json(result.rows);
  } catch (err) {
    //if an error occurs in the try, send it to the express error handler (error middleware)
    next(err);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const { name, age } = req.body;

    const result = await pool.query(
      "INSERT INTO users (name, age) VALUES ($1, $2) RETURNING *"[(name, age)]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};
