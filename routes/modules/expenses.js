// 載入套件
const express = require("express");
const router = express.Router();

// 載入model
const Expense = require("../../models/expense");
const Category = require("../../models/category");

// 路由
// 新增頁面
router.get("/new", (req, res) => {
  Category.find()
    .lean()
    .then((categoryList) => {
      res.render("new", { categoryList });
    });
});

// 新增
router.post("/", (req, res) => {
  const categorySelected = req.body.category;
  const userId = req.user._id;
  Category.findOne({ id: categorySelected })
    .then((item) => {
      const expense = { ...req.body, categoryId: item._id, userId };
      Expense.create(expense);
    })
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

// 修改頁面
router.get("/:expense_id/edit", (req, res) => {
  const _id = req.params.expense_id;
  const userId = req.user._id;
  Category.find()
    .lean()
    .then((categoryList) => {
      Expense.findOne({ _id, userId })
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

// 修改
router.put("/:expense_id", (req, res) => {
  const _id = req.params.expense_id;
  const userId = req.user._id;
  Category.findOne({ id: req.body.category })
    .then((category) => {
      const categoryId = category._id;
      const expenseUpdate = { ...req.body, categoryId };
      Expense.findByIdAndUpdate({ _id, userId }, expenseUpdate)
        .then(() => res.redirect("/"))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

// 刪除
router.delete("/:expense_id", (req, res) => {
  const _id = req.params.expense_id;
  const userId = req.user._id;
  Expense.findByIdAndDelete({ _id, userId })
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

// 輸出
module.exports = router;
