const express = require("express");
const router = express.Router();

//app.get("/", (req, res) => res.render("index"));
router.route("/").get((req, res) => {
  res.render("home", { login: "login", signup: "signup", messages: "" });
});


module.exports = router;