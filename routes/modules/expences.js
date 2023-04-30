// 載入套件
const express = require("express");
const router = express.Router();

// 載入model
const Expense = require("../../models/expense");
const Category = require("../../models/category");

// 路由
router.get("/new", (req, res) => {
  res.render("new");
});

router.post("/", (req, res) => {});

router.get("/:expense_id/edit", (req, res) => {
  res.render("edit");
});

// 輸出
module.exports = router;
