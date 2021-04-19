#  RestfulApi 紀錄




`npm init` 初始檔案

## 安裝

- `npm install express nodemon`  安裝express、nodemon


在 ‵paclage.json`內 :

      "scripts": {
        "start":"nodemon app.js"
      },


- `npm install mongoose`   安裝mongoose

上mlab  https://cloud.mongodb.com/

`Create new` 新增資料庫 

`rest` Clusters名稱
`testdy` 資料庫名稱

點選Clusters->Cluster0(自己的叢集)-> `CONNECT` --> `Connect yout application'，把url複製


- `npm install dotenv`   安裝dotenv

-----------------------------------------

新增‵app.js`

- 基本API

      const express = require('express');

      const app =express();

      app.get('/',(req,res)=>{
          res.send('We are on home');
      });

      app.listen(3000);
      
      
      
youtube :https://www.youtube.com/watch?v=vjf774RKrLc&t=16m47s
