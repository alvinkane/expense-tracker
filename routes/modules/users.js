// 導入
const express = require("express");
const router = express.Router();

// 路由
// 登入頁面
router.get("/login", (req, res) => {
  res.render("login");
});

// 註冊頁面
router.get("/register", (req, res) => {
  res.render("register");
});

// 輸出
module.exports = router;
