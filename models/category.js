// 載入mongoose
const mongoose = require("mongoose");

// Schema
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
});

// 輸出
module.exports = mongoose.model("Category", categorySchema);
