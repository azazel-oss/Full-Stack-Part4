const router = require("express").Router();
const User = require("../models/User");

const bcrypt = require("bcryptjs");

router.get("/", async (request, response) => {
  const results = await User.find({});
  response.status(200).json(results);
});

router.post("/", async (request, response) => {
  const { username, name, password } = request.body;
  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = new User({
    username,
    name,
    passwordHash,
  });
  await newUser.save();
  response.status(201).json({
    message: "User Created",
  });
});

module.exports = router;
