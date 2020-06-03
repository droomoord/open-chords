require("dotenv").config();

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const auth = require("../middleware/auth");

const User = require("../models/User");

//public:
//get all users
router.get("/", (req, res) => {
  User.find({}, (error, users) => {
    if (error) res.json(error.message);
    if (users) {
      usernames = users.map((user) => {
        return { name: user.name, _id: user._id };
      });
      res.json(usernames);
    }
  });
});

//public:
//create new user:
router.post("/", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await User.create({ email, name, password: hash });
    res.json(user);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});

//public:
//authenticate user
router.post("/auth", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const authenticated = await bcrypt.compare(password, user.password);
  if (authenticated) {
    const accessToken = jwt.sign(
      { email: user.email, name: user.name, _id: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "24h",
      }
    );
    res.json({ accessToken });
  } else {
    res.send("wrong credentials....");
  }
});

//dev
router.post("/devtestauth", auth, (req, res) => {
  res.send(req.user);
});

module.exports = router;
