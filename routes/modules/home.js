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
  // 使用分類篩選
  const sort = req.query.value || null;
  let category = "";
  // 用於修改dropdown內容
  Category.find({ id: sort })
    .then((item) => {
      if (item[0]) {
        return (category = item[0].name);
      }
    })
    .catch((err) => console.log(err));

  // 主程式
  Category.find()
    .lean()
    .then((categoryList) => {
      return Expense.find()
        .populate("categoryId") // 使得Expense與category連動
        .lean()
        .then((expences) => {
          // 篩選
          const expencesSort = expences.filter((expense) => {
            if (sort) {
              return expense.categoryId.id === sort;
            } else {
              return expense;
            }
          });
          // 加入icon
          const expencesList = expencesSort.map((expence) => {
            const categoryName = expence.categoryId.name;
            // 將兩個物件連接在一起
            return Object.assign(expence, {
              icon: categoryIcon[categoryName],
            });
          });
          // 計算總金額
          let totalAmount = 0;
          expencesList.forEach((item) => {
            totalAmount += Number(item.amount);
          });
          return res.render("index", {
            expencesList,
            categoryList,
            totalAmount,
            sort,
            category,
          });
        });
    });
});

// 輸出
module.exports = router;
