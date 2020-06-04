const mongoose = require("mongoose");

const progressionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  song: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "song"
  },
  chords: {
    type: Array,
    required: true,
  },
  key: {
    root: {
      type: String,
      required: true,
    },
    minor: {
      type: Boolean,
      default: false,
    },
  },
  votes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
});

const Progression = mongoose.model("progression", progressionSchema);

module.exports = Progression;
