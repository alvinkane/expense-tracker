// 載入套件
const mongoose = require("mongoose");

// Schema
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

// 輸出
module.exports = mongoose.model("User", userSchema);
