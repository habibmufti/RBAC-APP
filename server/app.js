if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const morgan = require("morgan");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const errorHandler = require("./helpers/errorHandler");
const UserRoute = require("./routes/UserRoute");

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World! ini dari bin www");
});

app.use(UserRoute);

app.use(errorHandler);

module.exports = { app, port };
