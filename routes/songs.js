const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const Song = require("../models/Song");
const Progression = require("../models/Progression");

//public:
// get all songs
router.get("/", (req, res) => {
  Song.find({}, (error, songs) => {
    if (error) res.status(404).json(error.message);
    if (songs) res.json(songs);
  });
});

//public:
//get a song by id:
router.get("/:id", (req, res) => {
  Song.findById(req.params.id)
    .populate("progressions")
    .exec((error, song) => {
      if (error) res.status(404).json(error.message);
      if (song) res.json(song);
    });
});

//private:
//create a new song:
router.post("/", auth, async (req, res) => {
  try {
    const { title, artist, chords, key } = req.body;
    if (!chords)
      res.status(400).json({ error: { message: "please provide chords" } });
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
    const updatedUser = await song.populate("progressions").execPopulate();
    res.json({ song });
  } catch (error) {
    res.status(400).json(error.message);
  }
});

//private
//edit a song (title/artist)
router.put("/:id", auth, async (req, res) => {
  try {
    const { title, artist } = req.body;
    const song = await Song.findById(req.params.id);
    if (req.user._id != song.user._id) {
      return res
        .status(403)
        .json({ error: { message: "You don't own this song" } });
    }
    if (title) song.title = title;
    if (artist) song.artist = artist;
    const editedSong = await song.save();
    res.json(editedSong);
  } catch (error) {}
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
