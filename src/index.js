import express from "express";
import cors from "cors";

const app = express();
const PORT = 5001;

//middleware
app.use(cors());
app.use(express.json());

//test route
app.get("/ping", (req, res) => {
  res.send("server is alive!");
});

//start server
app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
