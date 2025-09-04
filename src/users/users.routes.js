// this file defines URL's related to "users" (router).
// Router = like a mini-app; we just keep the /users paths here
// we connect to the main application by calling app.use("/users", usersRouter) within index.js

import { Router } from "express"; // we will define subpaths with express.Router
import { getAllUsers } from "./users.controller.js";

const router = Router(); //create a new router

//GET /users -> list all users
// it will work when we call http://localhost:50001/users from browser
router.get("/", getAllUsers);

//we export "router" by default from this file
// index.js will import this file and put it in the "/users" path
export default router;
