// 載入model
const Expense = require("../expense");
const Category = require("../category");

// 載入json
const expendRecordList = require("../../public/json/expense.json").records;

// 載入連接狀態
const db = require("../../config/mongoose");
const category = require("../category");

db.once("open", () => {
  console.log("running recordSeeder script...");
  Promise.all(
    Array.from({ length: expendRecordList.length }, (_, i) => {
      return Category.findOne({
        id: expendRecordList[i].categoryId,
      }).then((category) => {
        const categoryId = category._id;
        const categoryData = { ...expendRecordList[i], categoryId };
        Expense.create(categoryData);
      });
    })
  ).then(() => {
    console.log("done");
    process.exit();
  });
});
