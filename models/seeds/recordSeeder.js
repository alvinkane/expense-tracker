// 載入model
const Expense = require("../expense");

// 載入json
const expendRecordList = require("../expense.json").records;

// 載入連接狀態
const db = require("../../config/mongoose");

db.once("open", () => {
  console.log("running recordSeeder script...");

  expendRecordList.map((record) => {
    // 找尋對應的category，並利用解構賦值直接儲存進category
    const { name: category } = expendCategoryList.find(
      (item) => item.id === record.categoryId
    );
    // 只需要name, date, amount
    const { name, date, amount } = record;
    // 建立資料
    return Expense.create({ name, date, amount, category });
  });
  console.log("done");
});

//  && node models/seeds/recordSeeder.js
