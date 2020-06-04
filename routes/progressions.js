const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const Progression = require("../models/Progression");
const Song = require("../models/Song");

//public
//get all progressions
router.get("/", async (req, res) => {
  try {
    const progressions = await Progression.find({})
      .populate({ path: "user", select: "name" })
      .populate("song");

    res.json(progressions);
  } catch (error) {
    res.status(404).json(error.message);
  }
});

//public
//get a specific progression based on progresion id
router.get("/:id", async (req, res) => {
  try {
    const progression = await (
      await Progression.findById(req.params.id)
        .populate({ path: "user", select: "name" })
        .populate("song")
    ).execPopulate();
    res.json(progression);
  } catch (error) {
    res.status(404).json({ error: { message: "Chord progression not found" } });
  }
});

//private
//add a progression to a song
router.post("/:songid", auth, async (req, res) => {
  try {
    const { chords, key } = req.body;
    const progression = await Progression.create({
      user: req.user._id,
      chords,
      key,
      song: req.params.songid,
    });
    const song = await Song.findById(req.params.songid)
      .populate("progressions")
      .populate({ path: "user", select: "name" });
    song.progressions.push(progression);
    const updatedSong = await song.save();
    res.json(updatedSong);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

//------------------------------------------------------------------------------------
//04-05-2020

//private
//edit a progression (that you own)
router.put("/:progid", auth, async (req, res) => {
  try {
    const { key, chords } = req.body;
    const progression = await Progression.findById(req.params.progid)
      .populate("song")
      .populate({ path: "user", select: "name" });
    if (req.user._id != progression.user._id) {
      return res
        .status(403)
        .json({ error: { message: "You don't own this chord progression" } });
    }
    if (key) progression.key = key;
    if (chords) progression.chords = chords;
    const editedProgression = await progression.save();
    res.json(editedProgression);
  } catch (error) {
    res.send(400).json(error.message);
  }
});

//private
//delete a progression (that you own) and also remove it from the song
router.delete("/:progid", auth, async (req, res) => {
  try {
    const progression = await Progression.findById(req.params.progid);

    if (req.user._id != progression.user._id) {
      return res
        .status(403)
        .json({ error: { message: "You don't own this chord progression" } });
    }

    const song = await Song.findById(progression.song._id);

    const index = song.progressions.indexOf(progression._id);
    if (index > -1) song.progressions.splice(index, 1);
    const updatedSong = await song.save();

    await progression.delete();

    res.json(updatedSong);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
