const express = require("express");
const { signup, login, me, logout } = require("../controllers/authController");
const passport = require('../config/passport');

const router = express.Router();

// Local authentication routes
router.post("/signup", signup);
router.post("/login", login);
router.get("/me", me);
router.post("/logout", logout);

module.exports = router;