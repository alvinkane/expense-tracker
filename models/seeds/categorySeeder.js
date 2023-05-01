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
      Category.findOne({ name: categoryList[i].name }).then((name) => {
        if (name) {
          console.log("此類別已存在!");
          return;
        } else {
          return Category.create(categoryList[i]);
        }
      })
    )
  ).then(() => {
    console.log("done");
    process.exit();
  });
});
