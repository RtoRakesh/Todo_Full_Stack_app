const { Router } = require("express");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
require("dotenv").config();
var jwt = require("jsonwebtoken");

const accessToken = process.env.ACCESS_SECRET_KEY;
const userRoutes = Router();

userRoutes.post("/register", async (req, res) => {
  const { username, password, roles } = req.body;

  const user = await userModel.findOne({ username: username });

  if (user) {
    return res.status(400).json({ message: "Username found, please login" });
  }

  bcrypt.hash(password, 5, async (err, hash) => {
    if (err) {
      console.log("Error while hashing");
      return res.status(500).json({ message: "Internal server error" });
    }

    const newUser = new userModel({
      username,
      password: hash,
      roles,
    });

    await newUser.save();
    res.status(200).json({ message: "User registration successful" });
  });
});

// User login route
userRoutes.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const check = await userModel.findOne({ username: username });

  if (!check) {
    return res
      .status(400)
      .json({ message: "Username not found, please signup" });
  }

  bcrypt.compare(password, check.password, function (err, result) {
    if (err) {
      console.log("Error while comparing password");
      return res.status(500).json({ message: "Internal server error" });
    }

    if (result) {
      const payload = { id: check._id, role: check.roles };

      const token = jwt.sign(payload, accessToken);

      return res
        .status(200)
        .json({ message: "Login successful", accessToken: token });
    } else {
      return res
        .status(400)
        .json({ message: "Entered credentials are wrong! Try again" });
    }
  });
});

module.exports = userRoutes;
