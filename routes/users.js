require("dotenv").config();

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const auth = require("../middleware/auth");
const upperCase = require("../functions/upperCase");

const User = require("../models/User");

//public:
//get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find({})
      .select(["name", "songs", "progressions"])
      .populate([
        { path: "songs", select: ["artist", "title"] },
        { path: "progressions", select: ["key", "chords", "song"] },
      ]);
    res.json(users);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

//public:
//create new user:
router.post("/", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user)
      res
        .status(400)
        .json({ error: { message: "Email already exists in the database!" } });
    const { email, password, name } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    user = await User.create({
      email,
      name: upperCase(name),
      password: hash,
    });
    if (user) {
      const accessToken = jwt.sign(
        { email: user.email, name: user.name, _id: user._id },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "24h",
        }
      );

      res.json({
        user: {
          name: user.name,
          email: user.email,
        },
        accessToken,
      });
    }
  } catch (error) {
    res.status(400).json({ error: { message: "Something went wrong..." } });
  }
});

//public:
//authenticate user
router.post("/auth", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select([
    "email",
    "password",
    "name",
  ]);
  if (!user)
    res.status(400).json({ error: { message: "Wrong credentials..." } });
  const authenticated = await bcrypt.compare(password, user.password);
  if (authenticated) {
    const accessToken = jwt.sign(
      { email: user.email, name: user.name, _id: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "24h",
      }
    );

    res.json({
      user: {
        name: user.name,
        email: user.email,
      },
      accessToken,
    });
  } else {
    res.status(400).json({ error: { message: "Wrong credentials..." } });
  }
});

//get my user data
//private

router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select(["name", "email"])
      .populate([
        { path: "songs", select: ["title", "artist"] },
        "progressions",
      ]);
    res.json(user);
  } catch (error) {
    res.status(404).json(error.message);
  }
});

//get user info
//private
router.get("/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select("name")
      .populate([
        { path: "songs", select: ["title", "artist"] },
        "progressions",
      ]);
    res.json(user);
  } catch (error) {
    res.status(404).json(error.message);
  }
});

//dev
//delete all users

router.get("/dev/deleteall", async (req, res) => {
  try {
    await User.deleteMany({});
    res.send("users deleted");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
