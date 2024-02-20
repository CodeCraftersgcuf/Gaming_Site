const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  id: { type: String, required: false },
  title: { type: String, required: false },
  description: { type: String, required: false },
  instructions: { type: String, required: false },
  category: { type: String, required: false },
  tags: { type: String, default: "No tags" }, // Default value for tags
  thumb: { type: String, required: false },
  url: { type: String, required: false },
  width: { type: Number, required: false, default: 0 }, // Default value for width
  height: { type: Number, required: false, default: 0 }, // Default value for height
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
