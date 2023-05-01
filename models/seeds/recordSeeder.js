// 載入model
const Expense = require("../expense");
const Category = require("../category");
const User = require("../user");

// 載入json
const expendRecordList = require("../../public/json/expense.json").records;

// 載入連接狀態
const db = require("../../config/mongoose");

// user model
const userSeed = [
  {
    name: "廣志",
    email: "user1@example.com",
    password: "123456",
    index: "1",
  },
  {
    name: "小新",
    email: "user2@example.com",
    password: "123456",
    index: "2",
  },
];

db.once("open", () => {
  console.log("running recordSeeder script...");
  User.findOne({ email: userSeed[0].email })
    .then((user) => {
      if (user) {
        console.log("已建立該帳號!");
        console.log("done");
        process.exit();
      }
      User.create({
        name: userSeed[0].name,
        email: userSeed[0].email,
        password: userSeed[0].password,
      });
    })
    .then((user) => {
      const userId = user._id;
      return;
    })
    .catch((err) => console.log(err));
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
