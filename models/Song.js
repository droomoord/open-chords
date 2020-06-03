const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  progressions: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "progression" }],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

const Song = mongoose.model("song", songSchema);

module.exports = Song;
