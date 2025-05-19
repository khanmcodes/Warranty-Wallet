const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    }); // login token will expire in 7 days

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "Lax",
      secure: false,
    });

    res.json({ user: { name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: "Account does not exist" });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid password" });
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      });
  
      res.json({ 
        user: { name: user.name, email: user.email },
        token // Send token in response for client-side storage
      });
    } catch (err) {
      res.status(500).json({ message: "Login failed", error: err.message });
    }
};

exports.me = async (req, res) => {
    try {
      const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
      if (!token) return res.status(401).json({ message: "Unauthorized" });
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select("-password");
      res.json({ user });
    } catch (err) {
      res.status(401).json({ message: "Invalid token" });
    }
};

exports.logout = async (req, res) => {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "Lax",
      secure: false,
    });
    res.json({ message: "Logged out successfully" });
  };
