const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const randomGameSchema = new Schema({
  id: { type: String, required: false },
  title: { type: String, required: false },
  thumb: { type: String, required: false },
  url: { type: String, required: false },
});

const RandomGameData = mongoose.model("RandomGameData", randomGameSchema);

module.exports = RandomGameData;
