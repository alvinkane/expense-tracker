// 載入model
const Expense = require("../expense");

// 載入json
const expendRecordList = require("../expense.json").records;

// 載入連接狀態
const db = require("../../config/mongoose");
const category = require("../category");

db.once("open", () => {
  console.log("running recordSeeder script...");
  Promise.all(
    Array.from({ length: expendRecordList.length }, (_, i) =>
      Expense.create(expendRecordList[i])
    )
  ).then(() => {
    console.log("done");
    process.exit();
  });
});
