// 載入套件
const express = require("express");

// 使用Router
const router = express.Router();

// 使用Model
const Expense = require("../../models/expense");
const Category = require("../../models/category");

const categoryIcon = {
  家居物業: `<i class="fa-solid fa-house"></i>`,
  交通出行: `<i class="fa-solid fa-van-shuttle"></i>`,
  休閒娛樂: `<i class="fa-solid fa-face-grin-beam"></i>`,
  餐飲食品: `<i class="fa-solid fa-utensils"></i>`,
  其他: `<i class="fa-solid fa-pen"></i>`,
};

// 路由
// 首頁
router.get("/", (req, res) => {
  Expense.find()
    .lean()
    .then((expences) => {
      const expencesList = expences.map((expence) => {
        Category.find({ id: expence.categoryId }).then((item) => {
          console.log(item);
          const category = item.name;
          console.log(category);
          return category;
        });
        return Object.assign(expence, category);
      });

      return res.render("index", { expencesList });
    });
});

// 輸出
module.exports = router;
