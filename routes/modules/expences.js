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
  const _id = req.params.expense_id;
  Category.find()
    .lean()
    .then((categoryList) => {
      Expense.findOne({ _id })
        .populate("categoryId")
        .lean()
        .then((expense) => {
          const categoryListAddJudge = categoryList.map((item) => {
            const isCategory = item.id === expense.categoryId.id;
            return Object.assign(item, { isCategory });
          });
          res.render("edit", { expense, categoryListAddJudge });
        })
        .catch((err) => console.log(err));
    });
});

// 輸出
module.exports = router;
