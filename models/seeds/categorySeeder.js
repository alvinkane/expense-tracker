// 載入model
const Category = require("../category");
// 載入json
const categoryList = require("../../public/json/expense.json").categories;

// 呼叫mongoose
db = require("../../config/mongoose");

db.once("open", () => {
  console.log("running recordSeeder script...");
  Promise.all(
    Array.from({ length: categoryList.length }, (_, i) =>
      Category.create(categoryList[i])
    )
  ).then(() => {
    console.log("done");
    process.exit();
  });
});
