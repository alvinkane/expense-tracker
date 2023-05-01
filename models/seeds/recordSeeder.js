// 載入model
const Expense = require("../expense");
const Category = require("../category");
const User = require("../user");

const bcrypt = require("bcryptjs");

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
  for (let i = 0; i < userSeed.length; i++) {
    User.findOne({ email: userSeed[0].email })
      .then((user) => {
        if (user) {
          console.log("已建立該帳號!");
          if (i === userSeed.length - 1) {
            console.log("done");
            process.exit();
          }
        }
        bcrypt
          .genSalt(10)
          .then((salt) => bcrypt.hash(userSeed[i].password, salt))
          .then((hash) =>
            User.create({
              name: userSeed[i].name,
              email: userSeed[i].email,
              password: hash,
            })
          )
          .then((user) => {
            const userId = user._id;
            const categoryUserList = expendRecordList.filter((item) => {
              return item.userIndex === userSeed[i].index;
            });
            return Promise.all(
              Array.from({ length: categoryUserList.length }, (_, j) => {
                return Category.findOne({
                  id: categoryUserList[j].categoryIndex,
                }).then((item) => {
                  const categoryId = item._id;
                  const categoryData = {
                    ...categoryUserList[j],
                    categoryId,
                    userId,
                  };
                  return Expense.create(categoryData);
                });
              })
            );
          })
          .then(() => {
            if (i === userSeed.length - 1) {
              console.log("done");
              process.exit();
            }
          });
      })

      .catch((err) => console.log(err));
  }
});
