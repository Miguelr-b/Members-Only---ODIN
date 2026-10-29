const db = require("../models/queries");
const { body, validationResult } = require("express-validator");
const passport = require("./config/passport");

async function getRegister(req, res) {
    return res.render("register", { errors: [], values: {} });
}

async function register(req, res) {
  const { username, name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  try {
    await db.postSignUp({ username, name, email, password: hashed, membership: "common" });
  } catch (err) {
    if (err.code === "23505") { 
      return res.status(400).render("register", {
        errors: [{ msg: "Username or email" }],
        values: { username, name, email },
      });
    }
    throw err;
  }

  res.redirect("/login");
}

function getLogin(req, res) {
  const messages = req.session.messages || [];
  req.session.messages = [];
  res.render("login", { messages });
}

const login = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureMessage: true,
});

async function logout(req, res, next) {
    req.logout(err => {
        if (err) return next(err);
        res.redirect("/");
    })
}



module.exports = {
    getRegister,
    register,

    getLogin,
    login,

    logout,
};