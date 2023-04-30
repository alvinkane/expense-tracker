// 載入model
const Category = require("../category");
// 載入json
const categoryList = require("../expense.json").category;

// 呼叫mongoose
db = require("../../config/mongoose");

db.once("open", () => {
  console.log("running recordSeeder script...");
  categoryList.map((item) => Category.create(item));
  console.log("done");
});
