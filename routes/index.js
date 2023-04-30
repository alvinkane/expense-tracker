// 載入套件
const express = require("express");
const router = express.Router();

// 連結各路由
const home = require("./modules/home");

// router.use
router.use("/", home);

// 輸出
module.exports = router;
