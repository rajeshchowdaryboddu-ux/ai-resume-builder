const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Register
router.post("/register", async (req, res) => {
  try {
    const hashed = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashed
    });

    await user.save();
    res.send("User Registered");
  } catch (err) {
    res.status(500).send("Error");
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.send("User not found");

    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) return res.send("Wrong password");

    res.send("Login Success");
  } catch (err) {
    res.status(500).send("Error");
  }
});

module.exports = router;