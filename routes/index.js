// 載入套件
const express = require("express");
const router = express.Router();

// 連結各路由
const home = require("./modules/home");
const expenses = require("./modules/expenses");
const users = require("./modules/users");

// router.use
router.use("/expenses", expenses);
router.use("/users", users);
router.use("/", home);

// 輸出
module.exports = router;
