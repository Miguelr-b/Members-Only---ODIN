const db = require("../models/queries");
const { body, validationResult } = require("express-validator");
const passport = require("./config/passport");

async function getRegister(req, res) {
    return res.render("sign-up-form", );
}
async function register(req, res, next) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render("pages/auth", {
                route: "register",
                errors: errors.array(),
            });
        }
        else {
            const {username, name, email, password} = req.body;
            const hashed = await bcrypt.hash(password, 10);
            await db.postSignUp({ username, name, email, password: hashed, membership: "common" });

            return res.render("pages/auth", {
                route: "register",
                success: true,
            });
        }
    } catch (err) {
        next(err);
    }
}

async function getLogin(req, res) {
    return res.render("login");
}

async function login(req, res) {
    return passport.authenticate("local", {
            successRedirect: "/",
            failureRedirect: "/login",
        })
}
g
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