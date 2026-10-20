const db = require("../models/queries");
const { body, validationResult } = require("express-validator");
const passport = require("./config/passport");


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



module.exports = {
};