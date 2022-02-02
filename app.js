const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const router = require("./routes/webpages.js");
const path = require("path");
const mongoose = require("mongoose");
const { start } = require("repl");
const authenticates = require("./routes/authroutes");
const bodyParser = require("body-parser");
const User = require("./models/user");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const cart = require("./routes/cart");
require("dotenv").config();
app.use(cookieParser());
const sessionConfig = {
  secret: "anirudh",
  resave: false,
  saveUninitialized: true,
};
app.use(session(sessionConfig));
app.use(flash());
// parse application/json
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

//connect DB
mongoose.connect(process.env.DATABASE, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("database is ready to use");
  }
});
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.added = req.flash("added");
  next();
});

app.use("/", express.static(path.join(__dirname, "public")));
app.use(router);
app.use(authenticates);
app.use(cart);
///mongodb connection////

app.listen(process.env.PORT || 3000, () => {
  console.log(`listening on ${port}`);
});
