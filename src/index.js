import express from "express";
import cors from "cors";
import { pool } from "./db/pool.js";

const app = express();
const PORT = 5001;

//middleware
app.use(cors());
app.use(express.json());

//test route
app.get("/ping", (req, res) => {
  res.send("server is alive!");
});

//db test route
app.get("/db-check", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ dbConnected: true, time: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ dbConnected: false, error: error.message });
  }
});

//start server
app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
