const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");

userRouter.get("/register", userController.getRegister); 
userRouter.get("/login", userController.getLogin);

userRouter.post("/login", userController.login)
userRouter.post("/register", userController.registerRules, userController.register);

userRouter.post("/logout", userController.logout);


module.exports = userRouter;