const express = require("express");
const router = express.Router();

router.route("/").get((req, res) => {
  res.render("home", { login: "login", signup: "signup", messages: "" });
});

module.exports = router;