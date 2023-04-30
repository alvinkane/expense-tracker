// 載入套件
const express = require("express");

// 使用Router
const router = express.Router();

// 使用Model
const Expense = require("../../models/expense");
const Category = require("../../models/category");

const categoryIcon = {
  家居物業: `<i class="fa-solid fa-house fa-xl"></i>`,
  交通出行: `<i class="fa-solid fa-van-shuttle fa-xl"></i>`,
  休閒娛樂: `<i class="fa-solid fa-face-grin-beam fa-xl"></i>`,
  餐飲食品: `<i class="fa-solid fa-utensils fa-xl"></i>`,
  其他: `<i class="fa-solid fa-pen fa-xl"></i>`,
};

// 路由
// 首頁
router.get("/", (req, res) => {
  Category.find()
    .lean()
    .then((categoryList) => {
      return Expense.find()
        .populate("categoryId") // 使得Expense與category連動
        .lean()
        .then((expences) => {
          const expencesList = expences.map((expence) => {
            const categoryName = expence.categoryId.name;
            // 將兩個物件連接在一起
            return Object.assign(expence, { icon: categoryIcon[categoryName] });
          });
          return res.render("index", { expencesList, categoryList });
        });
    });
});

// 輸出
module.exports = router;
