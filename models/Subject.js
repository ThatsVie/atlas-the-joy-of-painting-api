const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  subject_id: { type: Number, required: true, unique: true },
  subject_name: { type: String, required: true },
});

module.exports = mongoose.model("Subject", subjectSchema);
