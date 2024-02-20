const express = require("express");
require("dotenv").config();
const app = express();
const mongoose = require("mongoose");
const gameSchema = require("./models/gameSchema.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const { gameData, getAllGameData } = require("./models/getRandomGames.js");
const bodyParser = require("body-parser");
const { gameHomeData, getHomeGameData } = require("./models/getHomeGames.js");
const dbUrl = process.env.ATLASDB_URL;

// mongoose.connect("mongodb://127.0.0.1:27017/gamingDb", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB Atlas:", err);
  });

// Set the view engine to EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

// Define your categories
const categories = [
  "",
  ".IO",
  "2 Player",
  "3D",
  "Action",
  "Adventure",
  "Arcade",
  "Bejeweled",
  "Boys",
  "Clicker",
  "Cooking",
  "Girls",
  "Hypercasual",
  "Multiplayer",
  "Puzzle",
  "Racing",
  "Shooting",
  "Soccer",
  "Sports",
  "Stickman",
];

// GET request for the index page
app.get("/", async (req, res) => {
  const Data = await gameSchema.find({});
  const second_section = getHomeGameData("second_section");
  const first_section = getHomeGameData("first_section");
  const third_section = getHomeGameData("third_section");
  res.render("./pages/index.ejs", {
    Data,
    categories,
    second_section,
    first_section,
    third_section,
  });
});

categories.forEach((category) => {
  app.get(`/categories/${encodeURIComponent(category)}`, async (req, res) => {
    const Data = await gameSchema.find({ category });

    if (category.toLowerCase() === "") {
      res.render(`./categories/unnamed.ejs`, { Data, category: "Unnamed" });
    } else if (category.toLowerCase() === ".io") {
      res.render(`./categories/io.ejs`, { Data, category: "IO" });
    } else if (category === "2 Player") {
      // Check if category is "2 Player"
      res.render(`./categories/2_player.ejs`, { Data, category: "2 Player" });
    } else {
      res.render(`./categories/${category.toLowerCase()}.ejs`, {
        Data,
        category,
      });
    }
  });
});
// Route handler for the game URL
app.get("/:gameUrl", async (req, res) => {
  try {
    const gameUrl = decodeURIComponent(req.params.gameUrl);
    // Fetch all information related to the game URL from the database
    const gameData = await gameSchema.findOne({ url: gameUrl });
    if (!gameData) {
      // If no data found for the game URL, render an error page or redirect
      return res.status(404).send("Game not found");
    }

    // Get all game data for each category
    const right_side = getAllGameData("right_side");
    const left_side = getAllGameData("left_side");
    const mid_section = getAllGameData("mid_section");
    const last_section = getAllGameData("last_section");

    // Render the gameplay page and pass the game data as locals
    res.render("./pages/gameplay.ejs", {
      right_side,
      last_section,
      gameData,
      left_side,
      mid_section,
    });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
