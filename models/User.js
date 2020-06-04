const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  songs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "song",
    },
  ],
  progressions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "progression",
    },
  ],
});

const Users = mongoose.model("user", userSchema);

module.exports = Users;
