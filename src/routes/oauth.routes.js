const router = require('express').Router();
const passport = require('passport');
const passportAuth = require("../utils/passport.auth")

router.get("/", passport.authenticate("google", { scope: ["email", "profile"] }));

router.get("/callback", passport.authenticate("google", {
    failureRedirect: "/login" }), passportAuth.createUserToken);
router.get("/login", );

module.exports = router;