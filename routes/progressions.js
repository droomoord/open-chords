const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const Progression = require("../models/Progression");
const Song = require("../models/Song");

//public
//get all progressions
router.get("/", async (req, res) => {
  try {
    const progressions = await Progression.find({});
    res.json(progressions);
  } catch (error) {
    res.json(error.message);
  }
});

//private
//create progression
router.post("/:songid", auth, async (req, res) => {
  try {
    const { chords, key } = req.body;
    const progression = await Progression.create({
      user: req.user._id,
      chords,
      key,
      song: req.params.songid,
    });
    const song = await Song.findById(req.params.songid);
    song.progressions.push(progression._id);
    await song.save();
    res.json(song);
  } catch (error) {
    res.json(error.message);
  }
});

module.exports = router;
