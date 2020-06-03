const mongoose = require("mongoose");

const chordSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const Chords = mongoose.model("chord", chordSchema);

module.exports = Chords;
