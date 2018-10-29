const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

exports.catSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
});

exports.Cat = mongoose.model("Cat", exports.catSchema);
