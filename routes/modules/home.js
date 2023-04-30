// 載入套件
const express = require("express");

// 使用Router
const router = express.Router();

// 路由
// 首頁
router.get("/", (req, res) => {
  res.render("index");
});

// 輸出
module.exports = router;
