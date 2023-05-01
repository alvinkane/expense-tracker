# expense-tracker
一個使用 Node.js + Express 製作的餐廳清單

## 功能 

=======
使用者可以：
1. 註冊帳號
    (1) 註冊之後，可以登入/登出
    (2) 只有登入狀態的使用者可以看到 app 內容，否則一律被導向登入頁
    (3)使用者登入或註冊失敗會顯示訊息提醒
2. 在首頁一次瀏覽所有支出的清單及總金額
   (1) 使用者只能看到自己建立的資料
4. 新增一筆支出
5. 編輯支出的屬性
6. 刪除任何一筆支出 (一次只能刪除一筆)
7. 根據「類別」篩選支出

## 安裝流程 

1. 打開 terminal, clone 此專案
   ```
   git clone https://github.com/alvinkane/expense-tracker.git
   ```
2. 移到存取的資料夾(expense-tracker)
   ```
   cd expense-tracker
   ```
3. 安裝 npm 套件
   ```
   npm install
   ```
4. 安裝 nodemon 套件(若有可省略)
5. 在專案內創造一個 env 檔案，可直接複製.env.example檔案，並將SKIP修改為自己的
   ```
   MONGODB_ENV=mongodb+srv://<username>:<password>@<cluster>.pk4dwnp.mongodb.net/restaurant-list?retryWrites=true&w=majority
   ```
6. 匯入種子檔案
   ```
   npm run seed
   ```
7. 出現'mongodb connected!' 'done' 代表成功
8. 執行專案
   ```
   npm run dev
   ```
9. 出現 "This is listening on http://localhost:3000" 'mongodb connected'代表成功
10. 開啟任一瀏覽器輸入 This is listening on http://localhost:3000

## 畫面   
![image](/image/view.png)

## 種子資料帳密

### 第一位使用者 
    email: user1@example.com
    password: 123456
### 第二位使用者 
    email: user2@example.com
    password: 123456

## 使用版本
node: 14.16.0  
npm: 6.14.11  
nodemon: 2.0.21
