// 載入套件
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;

// model
const User = require("../models/user");

// 輸出
module.exports = (app) => {
  // 初始化
  app.use(passport.initialize());
  app.use(passport.session());

  // 本地端策略
  passport.use(
    new localStrategy({ usernameField: "email" }, (email, password, done) => {
      User.findOne({ email })
        .then((user) => {
          // 錯誤條件
          if (!user) {
            console.log("帳號或密碼不正確!");
            return done(null, false);
          }
          if (user.password !== password) {
            console.log("帳號或密碼不正確!");
            return done(null, false);
          }
          return done(null, user);
        })
        .catch((err) => done(err, false));
    })
  );

  // 序列化
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // 反序列化
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then((user) => done(null, user))
      .catch((err) => done(err, false));
  });
};
