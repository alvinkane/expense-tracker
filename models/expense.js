// 載入套件
const mongoose = require("mongoose");

// 設定參數
const Schema = mongoose.Schema;

// 建立expense的Schema
const expenseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    index: true,
    required: true,
  },
});

// 輸出
module.exports = mongoose.model("Expense", expenseSchema);
