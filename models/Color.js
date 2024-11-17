const mongoose = require("mongoose");

const colorSchema = new mongoose.Schema({
  color_id: { type: Number, required: true, unique: true },
  color_name: { type: String, required: true },
});

module.exports = mongoose.model("Color", colorSchema);
