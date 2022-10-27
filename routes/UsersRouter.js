const router = require("express").Router();
const User = require("../models/User");

const bcrypt = require("bcryptjs");

router.get("/", async (request, response) => {
  const results = await User.find({});
  response.status(200).json(results);
});

router.post("/", async (request, response) => {
  const { username, name, password } = request.body;
  if (!password || password.length < 3) {
    return response.status(403).json({
      error: "Password must be at least 3 characters long",
    });
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = new User({
    username,
    name,
    passwordHash,
  });
  try {
    await newUser.save();
  } catch (err) {
    if (err.name === "ValidationError")
      return response.status(403).json({
        error:
          "Make sure username and password are valid and are at least 3 characters long",
      });
  }
  response.status(201).json({
    message: "User Created",
  });
});

module.exports = router;
