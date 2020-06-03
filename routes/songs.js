const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const Song = require("../models/Song");
const Progression = require("../models/Progression");

//public:
// get all songs
router.get("/", (req, res) => {
  Song.find({}, (error, songs) => {
    if (error) res.json(error.message);
    if (songs) res.json(songs);
  });
});

//public:
//get a song by id:
router.get("/:id", (req, res) => {
  Song.findById(req.params.id)
    .populate("progressions")
    .exec((error, song) => {
      if (error) res.json(error.message);
      if (song) res.json(song);
    });
});

//private:
//create a new song:
router.post("/", auth, async (req, res) => {
  console.log(req.user);
  try {
    const { title, artist, chords, key } = req.body;
    const progression = await Progression.create({
      chords,
      key,
      user: req.user._id,
    });
    const song = await Song.create({
      title,
      artist,
      progressions: progression._id,
      user: req.user._id,
    });
    res.json({ song, progression });
  } catch (error) {
    res.json(error.message);
  }
});

//development:
//create songs
router.post("/dev/:title", (req, res) => {
  Song.create({ title: req.params.title }, (error, song) => {
    if (error) res.json({ error: error.message });
    if (song) res.json(song);
  });
});

router.get("/dev/deleteall", async (req, res) => {
  try {
    await Song.deleteMany({});
    await Progression.deleteMany({});
    res.send("deleted...");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
