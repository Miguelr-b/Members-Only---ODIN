require('dotenv').config();
const bcrypt = require("bcryptjs");
const path = require("node:path");
const { Pool } = require("pg");
const express = require("express");
const session = require("express-session");
const passport = require("./config/passport");
const LocalStrategy = require('passport-local').Strategy;

// Home page (posts with likes / only members can like and see), 
// login, sign-up, new-message, profile

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

const homeRouter = require('./routes/index');
app.use( "/", homeRouter);

const userRouter = require('./routes/user');
app.use( "/user", userRouter);

//const messageRouter = require('./routes/message');
//app.use( "/message", messageRouter);


app.use((req, res) => {
  res.status(404).send("Page Not Found!");
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Something went wrong!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Listening on port ${PORT}!`);
});