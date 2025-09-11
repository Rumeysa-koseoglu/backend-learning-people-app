//this file is the entry point of our express server (the application starts here)
//purpose: simple health check for middleware
// and DB connection test. Settin up basic routes like /db-check
import express from "express"; //minimal framework for setting up HTTP an server
import cors from "cors";
import dotenv from "dotenv"; // to read .env file
dotenv.config(); //load .env content into process.env
import { pool } from "./db/pool.js"; // DB connection pool

const app = express(); //create express app
const PORT = 5001;

//--global middlewares--
//simply allow requests from all origins (practical while learning)
app.use(cors());
//To read requests with json body (converts to req.body)
app.use(express.json());

import usersRouter from "./users/users.routes.js";

app.use("/users", usersRouter);

//--simple health check--
// to test quickly "is server alive" from browser
app.get("/ping", (req, res) => {
  res.send("server is alive!");
});

//--db test route--
//our purpose: can we really communicate with Postgres
// "SELECT NOW()" returns the servers's time; if successful, the connection good
app.get("/db-check", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()"); //send query to DB
    //"reslut.rows" -> contains lines (NOW() -> returns single line/ single column)
    res.json({ dbConnected: true, time: result.rows[0] });
  } catch (error) {
    console.error(error);
    //500 = server-side error. We return the error message
    res.status(500).json({ dbConnected: false, error: error.message });
  }
});

//--start server--
// we listen to the port with app.listen; if successful, callback works
app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});

//notes: if you use nodemon with "npm run dev"; when you save the file server will restart automatically
//"npm start" works only with node. so manual on/off required for any changes

//error handler middleware
app.use((err, req, res, next) => {
  console.error("Error middleware:", err.message);
  res.status(500).json({ error: err.message });
});
