const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const homeGameSchema = new Schema({
  id: { type: String, required: false },
  title: { type: String, required: false },
  thumb: { type: String, required: false },
  url: { type: String, required: false },
});

const HomeGameData = mongoose.model("HomeGameData", homeGameSchema);

module.exports = HomeGameData;
