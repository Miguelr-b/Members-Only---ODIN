const express = require("express");
const passport = require("passport");
const userRouter = express.Router();
const userController = require("../controllers/userController");

userRouter.get("/sign-up", userController.getRegister); 
userRouter.get("/login", userController.getLogin);

userRouter.post("/login", userController.login)
router.post("/register", registerRules, handleRegisterErrors, userController.register);




module.exports = router;