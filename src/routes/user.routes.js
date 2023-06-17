const router = require('express').Router();

// Modules
const { signUp, login, logout } = require('../controllers/user.controller');

//create a user or signup
router.post("/signup", signUp);
//login user
router.post("/login", login);
//logout user
router.get("/logout", logout);

module.exports = router;