// 載入套件
const express = require("express");
const router = express.Router();

// 連結各路由
const home = require("./modules/home");
const expenses = require("./modules/expenses");
const users = require("./modules/users");

// 驗證登入狀態
const { authenticator } = require("../middleware/auth");

// router.use
router.use("/expenses", authenticator, expenses);
router.use("/users", users);
router.use("/", authenticator, home);

// 輸出
module.exports = router;
