// 導入
const express = require("express");
const router = express.Router();

// model
const User = require("../../models/user");

// 路由
// 登入頁面
router.get("/login", (req, res) => {
  res.render("login");
});

// 註冊頁面
router.get("/register", (req, res) => {
  res.render("register");
});

// 註冊
router.post("/register", (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  // 判斷是否皆有填或正不正確
  if (!email || !password || !confirmPassword) {
    console.log('Email及Password必填!"');
    res.render("/register", { name, email, password, confirmPassword });
  }
  if (password !== confirmPassword) {
    console.log("密碼與確認密碼不相符!");
    res.render("/register", { name, email, password, confirmPassword });
  }
  User.findOne({ email })
    .then((user) => {
      // 判斷是否有註冊
      if (user) {
        console.log("這個Email已經註冊過了!");
        res.render("/register", { name, email, password, confirmPassword });
      }
      User.create(req.body)
        .then(() => res.redirect("/users/login"))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

// 輸出
module.exports = router;
