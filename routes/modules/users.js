// 導入
const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");

// model
const User = require("../../models/user");

// 路由
// 登入頁面
router.get("/login", (req, res) => {
  res.render("login");
});

// 登入
router.post(
  "/login",
  (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      req.flash("warning_msg", "請輸入帳號及密碼!");
      return res.redirect("/users/login");
    }
    next();
  },
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login",
    failureFlash: true,
  })
);

// 註冊頁面
router.get("/register", (req, res) => {
  res.render("register");
});

// 註冊
router.post("/register", (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  // 判斷是否皆有填或正不正確
  const errors = [];
  if (!email || !password || !confirmPassword) {
    errors.push({ message: "Email及Password必填!" });
  }
  if (password !== confirmPassword) {
    errors.push({ message: "密碼與確認密碼不相符!" });
  }
  if (errors.length) {
    return res.render("register", {
      errors,
      name,
      email,
      password,
      confirmPassword,
      errors,
    });
  }
  User.findOne({ email })
    .then((user) => {
      // 判斷是否有註冊
      if (user) {
        errors.push({ message: "這個Email已經註冊過了!" });
        res.render("register", {
          errors,
          name,
          email,
          password,
          confirmPassword,
        });
      } else {
        bcrypt
          .genSalt(10)
          .then((salt) => bcrypt.hash(password, salt))
          .then((hash) => {
            User.create({
              name,
              email,
              password: hash,
            })
              .then(() => res.redirect("/users/login"))
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
});

// 登出
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "你已經成功登出。");
  res.redirect("/users/login");
});

// 輸出
module.exports = router;
