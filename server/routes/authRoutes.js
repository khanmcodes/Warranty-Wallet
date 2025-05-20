const express = require("express");
const { signup, login, me, logout, verifyEmail } = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", me);
router.post("/logout", logout);
router.get("/verify-email/:token", verifyEmail);

module.exports = router;