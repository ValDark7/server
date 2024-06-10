const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");

// GET /api/profile
router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user.profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// PUT /api/profile
router.put("/", authMiddleware, async (req, res) => {
  const { firstName, lastName, middleName, gender, birthDate, phone, email } =
    req.body;
  const profileFields = {
    firstName,
    lastName,
    middleName,
    gender,
    birthDate,
    phone,
    email,
  };

  try {
    let user = await User.findById(req.user.id);

    if (user) {
      // Update
      user.profile = profileFields;
      await user.save();
      return res.json(user.profile);
    }

    res.status(400).json({ msg: "User not found" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
