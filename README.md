# 短網址產生器-實作-URL_Shortener
![](https://github.com/Ace1862020/URL_Shortener_remote/blob/master/public/url-shortener-index.jpg)

## Features - 產品特色
* 輸入網址，會回傳格式化的短網址
* 使用短網址可以連向原網站
* 如果未輸入任何內容就shorten，會顯示錯誤
* 短網址為5碼英數組合(含大小寫)
* 點擊Copy可以複製短網址在您的剪貼簿裡
* 點擊Back按鈕or大icon，網頁會回到初始狀態 

## Environment Setup - 環境建置
* [Node.js](https://nodejs.org/en/) (version - 10.15.0) - JavaScript 執行環境

## Built with & Tools - 建置工具
* [npm](https://www.npmjs.com/get-npm) (version - 6.4.1) - Node.js 的套件管理器
* [nodemon](https://www.npmjs.com/package/nodemon) (version - 2.0.7) - 伺服器輔助
* [Express](https://www.npmjs.com/package/express) Framework (version - 4.17.1) - 應用程式框架
* [Express-handlebars](https://www.npmjs.com/package/express-handlebars) (version - 5.2.0) - 模板引擎
* [body-parser](https://www.npmjs.com/package/body-parser)
* [MongoDB](https://www.mongodb.com/)
* [Mongoose](https://www.npmjs.com/package/mongoose)
* [Visual Stuldio Code](https://code.visualstudio.com/download) - 開發環境

## Install - 安裝
1. 開啟終端機(Terminal) 或 (Git Bash) -> 到欲存放專案的本機位置 並執行:
```
git clone https://github.com/Ace1862020/URL_Shortener_remote.git
```
2. 使用終端機(Terminal) 或 (Git Bash) -> 進入到放此專案的資料夾
```
cd url-shortener
```
3. 使用終端機(Terminal) 或 (Git Bash) -> 安裝 npm 套件
```
npm install
```
4. 安裝 nodemon
```
npm install -g nodemon
```
5. 匯入種子資料到資料庫
```
npm run seed
```
6. 啟動伺服器，執行 app.js 檔案
```
npm run dev
```
7. 終端機顯示以下字樣，表示連線成功
```
App running on http://localhost:3000
MongoDB connected!!!
```
