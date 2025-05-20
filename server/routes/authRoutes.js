const express = require("express");
const { signup, login, me, logout } = require("../controllers/authController");
const passport = require('../config/passport');

const router = express.Router();

// Local authentication routes
router.post("/signup", signup);
router.post("/login", login);
router.get("/me", me);
router.post("/logout", logout);

// Google authentication routes
router.get('/google',
  passport.authenticate('google', { 
    scope: ['profile', 'email'],
    session: false 
  })
);

router.get('/google/callback',
  passport.authenticate('google', { 
    failureRedirect: '/login',
    session: false 
  }),
  (req, res) => {
    // Successful authentication
    const { user, token } = req.user;
    
    // Set the token in an HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    // Send the token in the response body as well
    res.redirect(`${process.env.FRONTEND_URL}/dashboard?token=${token}`);
  }
);

module.exports = router;