// 載入套件
const express = require("express");
const exphbs = require("express-handlebars");
const mehthodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");

// 載入mongoose
require("./config/mongoose");

const usePassport = require("./config/passport");

// 載入路由
const routes = require("./routes");

// 設定變數
const port = process.env.PORT;

const app = express();

// 設定hbs
app.engine("hbs", exphbs({ defaultLayout: "main", extname: "hbs" }));
app.set("view engine", "hbs");

// use body-parser
app.use(express.urlencoded({ extended: true }));

// use method-override
app.use(mehthodOverride("_method"));

// 設定靜態網站
app.use(express.static("public"));

// 設定session
app.use(
  session({
    secret: "ThisSecretIsForExtense",
    resave: false,
    saveUninitialized: true,
  })
);

// 登入狀態
usePassport(app);

// 訊息
app.use(flash());

// 設定本地變數
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.user = req.user;
  res.locals.success_msg = req.flash("success_msg");
  res.locals.warning_msg = req.flash("warning_msg");
  next();
});

// 設定路由
app.use(routes);

// 監聽
app.listen(port, () => {
  console.log(`This is listening on http://localhost:${port}`);
});
