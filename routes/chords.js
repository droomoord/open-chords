const express = require("express");
const router = express.Router();

const Chord = require("../models/Chord");

//public
//get all chords
router.get("/", (req, res) => {
  Chord.find({}, (error, chords) => {
    if (error) res.json(error.message);
    if (chords) res.json(chords);
  });
});

//dev
//seed

router.get("/seed", async (req, res) => {
  try {
    const rootNames = [
      "C",
      "C#",
      "D",
      "D#",
      "E",
      "F",
      "F#",
      "G",
      "G#",
      "A",
      "A#",
      "B",
    ];
    const types = ["", "m", "m7", "m9", "maj7", "maj9", "m7b5", "dim", "aug"];
    await Chord.deleteMany({});
    rootNames.forEach((rootName) => {
      types.forEach((type) => {
        Chord.create({ name: rootName + type }, (error) => {
          if (error) console.log(error);
        });
      });
    });
    res.send("chords created...");
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
