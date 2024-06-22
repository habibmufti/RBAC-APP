const UserRoute = require("express").Router();
const UserController = require("../controllers/UserController");
UserRoute.post("/register", UserController.CreateUser);
UserRoute.post("/login", UserController.Login);
module.exports = UserRoute;
