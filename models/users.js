const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
      type: String,
      bcrypt: true
  }
});

userSchema.plugin(require('mongoose-bcrypt'));

exports.userSchema = userSchema;
exports.User = mongoose.model("User", exports.userSchema);
