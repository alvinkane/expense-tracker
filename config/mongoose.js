const mongoose = require("mongoose");

// 開發環境啟用dotenv
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// 連結資料庫
mongoose.connect(process.env.MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

// 取得練線狀態
const db = mongoose.connection;

// 異常偵測
db.on("error", () => {
  console.log("mongodb error");
});

// 成功偵測
db.once("open", () => {
  console.log("mongodb connected");
});

module.exports = db;
