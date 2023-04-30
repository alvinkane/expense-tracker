// 載入套件
const express = require("express");

// 載入mongoose
require("./config/mongoose");

// 載入路由
const routes = require("./routes");

// 設定變數
const port = process.env.PORT;

const app = express();

// 設定路由
app.use(routes);

// 監聽
app.listen(port, () => {
  console.log(`This is listening on http://localhost:${port}`);
});
