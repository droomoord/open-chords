const express = require("express");
const app = express();
const connectDB = require("./connectDB/connectDB");

//import routes:

const songs = require("./routes/songs");
const chords = require("./routes/chords");
const users = require("./routes/users");
const progressions = require("./routes/progressions");

connectDB();

//models:

const Chords = require("./models/Chord");

//middleware:

app.use(express.json());

//ROUTES:

app.use("/songs", songs);
app.use("/chords", chords);
app.use("/users", users);
app.use("/progressions", progressions);

app.listen(5000, () => console.log("working..."));
