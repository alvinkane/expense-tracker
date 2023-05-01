// 載入套件
const express = require("express");
const exphbs = require("express-handlebars");
const mehthodOverride = require("method-override");
const session = require("express-session");

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

usePassport(app);

// 設定路由
app.use(routes);

// 監聽
app.listen(port, () => {
  console.log(`This is listening on http://localhost:${port}`);
});
